import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import * as userActions from './user.actions';
import {ToastUtil} from "../../util/ToastUtil";
import {TokenUtil} from "../../util/TokenUtil";
import {UserView} from "../../modules/users/models/UserView";

export const userFeatureKey = "userFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    user: UserView;
    token: string;
    isAuthenticated: boolean
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    user: {} as UserView,
    token: "",
    isAuthenticated: false
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        userLogOutAction: (state) => {
            TokenUtil.deleteToken(); // remove token from local storage
            state.isAuthenticated = false;
            state.user = {} as UserView;
            ToastUtil.displayInfoToast('Logout is Success');
        }
    },
    extraReducers: (builder) => {
        // register user
        builder.addCase(userActions.registerUserAction.pending, (state) => {
            state.loading = true;
        }).addCase(userActions.registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(userActions.registerUserAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`${action.payload.status} : ${action.payload.msg}`);
            }
        })

            // login user
            .addCase(userActions.loginUserAction.pending, (state) => {
                state.loading = true;
            }).addCase(userActions.loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            TokenUtil.saveToken(action.payload.token); // saves token to session storage
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(userActions.loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.user = {} as UserView;
            state.isAuthenticated = false;
            state.token = "";
            TokenUtil.deleteToken();
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(action.payload.msg);
            }
        })

            // get user info
            .addCase(userActions.getUserInformationAction.pending, (state) => {
                state.loading = false;
            }).addCase(userActions.getUserInformationAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload?.user;
        }).addCase(userActions.getUserInformationAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`${action.payload.status} : ${action.payload.msg}`);
            }
        })

            // upload Profile Picture
            .addCase(userActions.updateProfilePictureAction.pending, (state) => {
                state.loading = false;
            }).addCase(userActions.updateProfilePictureAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            ToastUtil.displaySuccessToast(`Profile image is uploaded!`);
        }).addCase(userActions.updateProfilePictureAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Profile upload is Failed!`);
            }
        })

            // change Password
            .addCase(userActions.changePasswordAction.pending, (state) => {
                state.loading = false;
            }).addCase(userActions.changePasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(userActions.changePasswordAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Change Password is Failed!`);
            }
        })
    }
})
export const {userLogOutAction} = userSlice.actions;














