import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "recoil-persist",
    storage: localStorage,
});

export const myToken = atom({
    key: "token",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

export const usermyId = atom({
    key: "myId",
    default: "",
    effects_UNSTABLE: [persistAtom],
});