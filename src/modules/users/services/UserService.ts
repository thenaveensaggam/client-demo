import axios from 'axios';
import {UserView} from "../models/UserView";

export class UserService {

    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    // PUBLIC
    public static registerUser(user: UserView): Promise<{ data: { msg: string } }> {
        let dataUrl = `${this.serverUrl}/api/users/register`;
        return axios.post(dataUrl, user);
    }

    // PUBLIC
    public static loginUser(user: UserView): Promise<{ data: { msg: string, token: string, user: UserView } }> {
        let dataUrl = `${this.serverUrl}/api/users/login`;
        return axios.post(dataUrl, user);
    }

    // PRIVATE
    public static getUserData(): Promise<{ data: { user: UserView } }> {
        let dataUrl = `${this.serverUrl}/api/users/me`;
        return axios.get(dataUrl);
    }

    // PRIVATE
    public static uploadProfilePicture(imageUrl: string): Promise<{ data: { user: UserView } }> {
        let dataUrl = `${this.serverUrl}/api/users/profile`;
        return axios.post(dataUrl, {imageUrl});
    }

    // PRIVATE
    public static changePassword(password: string): Promise<{ data: { user: UserView, msg: string } }> {
        let dataUrl = `${this.serverUrl}/api/users/change-password`;
        return axios.post(dataUrl, {password});
    }
}