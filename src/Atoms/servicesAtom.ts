import { atom, RecoilState } from "recoil";
import { IService } from "../shared/interfaces";

const initialState: IService[] = [];

export const servicesAtom: RecoilState<IService[]> = atom({
    key: 'servicesAtom', 
    default: initialState
});