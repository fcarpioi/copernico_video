import React, { useMemo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { collectionGroup, query, where, orderBy, onSnapshot, collection, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import BroadcastCard from './BroadcastCard';

const DeviceInfoBox = ({ sampleRace }) => {
  const [broadcasts, setBroadcasts] = useState([]);
  const [allDeviceInfo, setAllDeviceInfo] = useState([]);
  const idRace = useMemo(() => sampleRace.competitionId, [sampleRace]);

  // Función para suscribirse a los cambios en tiempo real en los broadcasts
  const subscribeBroadcasts = useCallback(() => {
    const broadcastsQuery = query(
      collectionGroup(db, 'broadcasts'),
      where('idRace', '==', idRace),
      where('is_live', '==', true)
    );

    const unsubscribe = onSnapshot(broadcastsQuery, async (broadcastsSnapshot) => {
      console.log('Broadcasts actualizados:', broadcastsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      const broadcastsData = await Promise.all(
        broadcastsSnapshot.docs.map(async (broadcastDoc) => {
          const broadcastData = broadcastDoc.data(); // Contiene "name", "idRace", etc.
          console.log("Broadcast Data:", broadcastData); 
          console.log("Broadcast Name:", broadcastData.name); 
          const broadcastId = broadcastDoc.id;
          const broadcastPath = broadcastDoc.ref.path;
          const deviceInfoQuery = query(
            collection(db, `${broadcastPath}/device_info`),
            orderBy('timestamp', 'desc'),
            limit(1)
          );
          const deviceInfoSnapshot = await onSnapshotPromise(deviceInfoQuery);
          // Para cada registro de device_info, añadimos el campo "name" del broadcast
          const deviceInfoList = deviceInfoSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            broadcastId,
            name: broadcastData.name || 'Sin Nombre',
            url: broadcastData.url || ''  
          }));
          return { broadcastId, deviceInfo: deviceInfoList, ...broadcastData };
        })
      );
      setBroadcasts(broadcastsData);
      // Aplanamos todos los arrays de device_info en uno solo
      const flattened = broadcastsData.flatMap(b => b.deviceInfo);
      setAllDeviceInfo(flattened);
    }, (error) => {
      console.error('Error en onSnapshot:', error);
    });

    return unsubscribe;
  }, [idRace]);

  // Función auxiliar para envolver onSnapshot en una promesa y obtener el snapshot una sola vez
  const onSnapshotPromise = (queryRef) => {
    return new Promise((resolve) => {
      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        unsubscribe(); // Cancelamos la suscripción inmediatamente para obtener solo el snapshot actual
        resolve(snapshot);
      });
    });
  };

  useEffect(() => {
    console.log('idRace recibido:', sampleRace);
    if (idRace) {
      const unsubscribe = subscribeBroadcasts();
      return () => {
        unsubscribe();
      };
    }
  }, [idRace, subscribeBroadcasts]);

  return (
    <div>
      {allDeviceInfo.length === 0 ? (
        <p>No Race Data.</p>
      ) : (
        // Se pasa el array combinado a BroadcastCard
        <BroadcastCard deviceInfo={allDeviceInfo} />
      )}
    </div>
  );
};

DeviceInfoBox.propTypes = {
  sampleRace: PropTypes.shape({
    idRace: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeviceInfoBox;