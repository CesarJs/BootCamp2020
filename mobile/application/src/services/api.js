import axios from 'axios';

const api = axios.create({
	baseURL: 'http://192.168.0.110:3333',
});

export default api;

/**
 * IOS com emulador: localhost
 * IOS com device : ip da máquina
 * Android com emulador: localhost com adv reverse
 * Android com emulador: 10.0.2.2 (Android studio)
 * Adnroid com emulador: 10.0.3.2 (Genymotion)
 * Android device : Ip máquina
 */
