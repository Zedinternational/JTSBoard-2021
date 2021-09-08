import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from "@react-native-firebase/database";
import storage from '@react-native-firebase/storage';

import NetInfo from '@react-native-community/netinfo';
import messaging from "@react-native-firebase/messaging";

const CLOUD_MESSAGING_SERVER_KEY = 'AAAALQ6fw50:APA91bF_Fag4MAlxXMXP56DEBPlS66CSAvZlqEtW8YNj9oNJtHIlDbd70MIkK1aiRJ_XirwkbZIpsHz-fIsEtnDeXwLP_HJosDKTK2doN8NZ9mBowhz668QHWAxCwsg1ODmzUSTx6wG3';

export const DB_ACTION_ADD = 'add';
export const DB_ACTION_UPDATE = 'update';
export const DB_ACTION_DELETE = 'delete';

const firebaseSdk = {
    TBL_advertisements : "advertisements",
    TBL_albums : "albums",
    TBL_ar_internal_metadata : "ar_internal_metadata",
    TBL_attendances : "attendances",
    TBL_budgets : "budgets",
    TBL_categories : "categories",
    TBL_category_tests : "category_tests",
    TBL_colors : "colors",
    TBL_customers : "customers",
    TBL_customer_histories : "customer_histories",
    TBL_customer_user_services : "customer_user_services",
    TBL_default_advertisements : "default_advertisements",
    TBL_default_services : "default_services",
    TBL_employees : "employees",
    TBL_employee_chats : "employee_chats",
    TBL_employee_roles : "employee_roles",
    TBL_expenses : "expenses",
    TBL_galleries : "galleries",
    TBL_holidays : "holidays",
    TBL_jwt_blacklist : "jwt_blacklist",
    TBL_menu_records : "menu_records",
    TBL_note_images : "note_images",
    TBL_note_products : "note_products",
    TBL_note_services : "note_services",
    TBL_notifications : "notifications",
    TBL_products : "products",
    TBL_read_statuses : "read_statuses",
    TBL_reservations : "reservations",
    TBL_reservation_paramaters : "reservation_paramaters",
    TBL_schema_migrations : "schema_migrations",
    TBL_scrap_customers : "scrap_customers",
    TBL_services : "services",
    TBL_sub_services : "sub_services",
    TBL_temp_products : "temp_products",
    TBL_temp_services : "temp_services",
    TBL_temp_users : "temp_users",
    TBL_temp_user_working_days : "temp_user_working_days",
    TBL_users : "users",
    TBL_users_advertisements : "users_advertisements",
    TBL_users_services : "users_services",
    TBL_user_categories : "user_categories",
    TBL_user_working_days : "user_working_days",
    TBL_watermark_galleries : "watermark_galleries",

    STORAGE_TYPE_AVATAR: "avatar",
    STORAGE_TYPE_PHOTO: "photo",

    async checkInternet(){
        return NetInfo.fetch().then(state => {
            return state.isConnected;
        })
    },

    authorizedUser(){
        return auth().currentUser;
    },

    signInWithEmail(email, password){
        return new Promise((resolve, reject) => {
            auth().signInWithEmailAndPassword(email, password)
                .then((res) => {
                    this.getUser(res.user.uid)
                        .then((user) => {
                            resolve(user);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .catch((err) => {
                    reject(err.message);
                });
        })
    },

    resetPassword(email){
        return new Promise((resolve, reject) => {
            auth().sendPasswordResetEmail(email)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err.code);
                })
        })
    },

    signUp(user){
        return new Promise((resolve, reject) => {
            const {email, password} = user;
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    const userInfo = {
                        userId: res.user.uid,
                        type: 100, // User: 100
                        name: user.name,
                        email: user.email,
                        avatar: '',
                        address: '',
                        interests: "",
                        age: 0,
                        bio: '',
                        ratingTotal: 0,
                        ratingCount: 0,
                        isBanned: false,
                        token: '',
                        qbId: 0,
                        friends: [],
                        activities: [],
                        outdoor: [],
                    };
                    this.createUser(userInfo).then(() => {
                        resolve(userInfo);
                    }).catch((err) => {
                        console.log('error', err);
                        reject(err);
                    });

                })
                .catch((err) => {
                    console.log('error', err);
                    reject(err);
                });
        })
    },

    signOut(){
        return new Promise((resolve, reject) => {
            auth().signOut().then((res) => resolve(res)).catch(err => reject(err));
        });
    },

    createUser(userInfo){
        return new Promise((resolve, reject) => {
            firestore()
                .collection(this.TBL_users)
                .add(userInfo)
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    deleteUser(id){
        return new Promise((resolve, reject) => {
            firestore()
                .collection(this.TBL_users)
                .doc(id)
                .delete()
                .then(() => {
                    console.log('delete user on doc success');
                })
                .catch((err) => {
                    console.log('delete user on doc error', err)
                });

            auth().currentUser.delete()
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err)
                });
        })
    },

    getUser(id){
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection(this.TBL_users)
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        if (doc.data().userId === id) {
                            const user = {
                                id: doc.id,
                                ...doc.data()
                            }
                            resolve(user);
                        }
                    })
                    resolve('no exist');
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getData(kind = ''){
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection(kind)
                .get()
                .then(snapshot => {
                    var data = [];
                    snapshot.forEach(doc => {
                        var obj = doc.data();
                        Object.assign(obj, {id: doc.id});
                        data.push(obj);
                    })
                    console.log('getData : ' + kind + ' Data: ', data);
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    },

    setData(kind = '', act, item){
        return new Promise((resolve, reject) => {
            if (act === DB_ACTION_ADD) {
                firebase.firestore()
                    .collection(kind)
                    .add(item)
                    .then((res) => {
                        let itemWithID = {...item, id: res.id};
                        firebase.firestore()
                            .collection(kind)
                            .doc(res.id)
                            .update(itemWithID)
                            .then((response) => {
                                resolve(itemWithID)
                            })
                            .catch((err) => {
                                reject(err);
                            })
                    })
                    .catch(err => {
                        reject(err);
                    })
            } else if (act === DB_ACTION_UPDATE) {
                firebase.firestore()
                    .collection(kind)
                    .doc(item.id)
                    .update(item)
                    .then(() => {
                        resolve();
                    })
                    .catch(err => {
                        reject(err);
                    })
            } else if (act === DB_ACTION_DELETE) {
                firebase.firestore()
                    .collection(kind)
                    .doc(item.id)
                    .delete()
                    .then(() => {
                        console.log(kind, act)
                        resolve();
                    })
                    .catch(err => {
                        reject(err);
                    })
            }
        })
    },

    uploadMedia(type, path){
        const milliSeconds = new Date().getMilliseconds();
        return new Promise((resolve, reject) => {

            let ref = storage().ref(`${type}_${milliSeconds}`);

            ref.putFile(path)
                .then(async (res) => {
                    const downloadURL = await ref.getDownloadURL();
                    resolve(downloadURL);
                })
                .catch((err) => {
                    reject(err);
                });
        })
    },

    async saveMessage(roomId, message, receiver){
        const statusRef = database().ref('rooms/' + roomId + '/status/' + message.receiver);
        const status = (await statusRef.once('value')).val();
        console.log('chatter status', status);
        if(!status || status === 'offline'){
            await firebase.firestore().collection(this.TBL_ROOM).doc(roomId).update({lastMessage: message.message, confirmUser: message.receiver});
            if(receiver.token) {
                const text = `${receiver.firstName} ${receiver.lastName} sent new Message: ${message.message}`;
                this.sendNotifications([receiver.token], {
                    type: NOTIFICATION_TYPE_CHAT,
                    state: NOTIFICATION_STATE_PENDING,
                    message: text,
                    sender: message.sender,
                    receiver: message.receiver,
                    date: new Date(),
                    meetupId: ""
                })
            }
        }
        return await firebase.firestore().collection(this.TBL_MESSAGE).add(message);
    },

    onOnline(roomId, userId){
        const statusRef = database().ref('rooms/' + roomId + '/status/' + userId);
        statusRef.set('online');
        statusRef.onDisconnect().set('offline').then(() => {}).catch(() => {});
    },

    onOffline(roomId, userId){
        const statusRef = database().ref('rooms/' + roomId + '/status/' + userId);
        statusRef.set('offline');
    },

    registerNotification(notification, token){
        return new Promise((resolve, reject) => {
            firestore()
                .collection(this.TBL_NOTIFICATION)
                .add(notification)
                .then(() => {
                    if(token){
                        this.sendNotifications([token], notification);
                    }
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    async setFcmToken(userid){
        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log("Your Firebase Token is:", fcmToken);
                this.setData(this.TBL_users, DB_ACTION_UPDATE, {id: userid, token: fcmToken});
                return;
            }
        }
        console.log("Failed", "No token received");
        return null
    },

    sendNotifications(tokens, data){
        for (let i = 0; i < tokens.length; i++) {
            let params = {
                to: tokens[i],
                data
            };

            let options = {
                method: 'POST',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                    'Authorization': `key=${CLOUD_MESSAGING_SERVER_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            };
            console.log('send notification: ', options);
            try {
                fetch('https://fcm.googleapis.com/fcm/send', options);
            } catch (e) {
                console.log('Send Notification Error:', e);
            }
        }
        return true;
    }
}

export default firebaseSdk;
