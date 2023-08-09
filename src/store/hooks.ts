import type { InitialState, StoreDispatch } from "./store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<StoreDispatch>();
export const useAppSelector: TypedUseSelectorHook<InitialState> = useSelector;
