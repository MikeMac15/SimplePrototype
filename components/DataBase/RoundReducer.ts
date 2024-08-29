import { ShotData } from "./Classes";

export interface State {
    shotData: ShotData;
    gir: boolean;
    fir: boolean;
    shotColors: string[];
  }
  
  export type ActionType =
    | { type: 'ADD_SHOT'; shotType: keyof ShotData }
    | { type: 'SUBTRACT_SHOT'; shotType: keyof ShotData }
    | { type: 'SET_GIR'; value: boolean }
    | { type: 'SET_FIR'; value: boolean }
    | { type: 'ADD_SHOT_COLOR'; color: string }
    | { type: 'SUB_SHOT_COLOR'; color: string }
    | { type: 'RESET' };
  
    
  export const initialState: State = {
    shotData: {
      great: 0,
      good: 0,
      bad: 0,
      putt: 0,
    },
    gir: false,
    fir: false,
    shotColors: [],
  };
  
  export const reducer = (state: State, action: ActionType): State => {
    switch (action.type) {
      case 'ADD_SHOT':
        return {
          ...state,
          shotData: {
            ...state.shotData,
            [action.shotType]: state.shotData[action.shotType] + 1,
          },
        };
      case 'SUBTRACT_SHOT':
        return {
          ...state,
          shotData: {
            ...state.shotData,
            [action.shotType]: Math.max(state.shotData[action.shotType] - 1, 0),
          },
        };
      case 'SET_GIR':
        return {
          ...state,
          gir: action.value,
        };
      case 'SET_FIR':
        return {
          ...state,
          fir: action.value,
        };
      case 'ADD_SHOT_COLOR':
        return {
          ...state,
          shotColors: [...state.shotColors, action.color],
        };
      case 'SUB_SHOT_COLOR':
        const lastColorIdx = state.shotColors.lastIndexOf(action.color);
        if (lastColorIdx !== -1) {
          return {
            ...state,
            shotColors: [
              ...state.shotColors.slice(0, lastColorIdx),
              ...state.shotColors.slice(lastColorIdx + 1),
            ],
          };
        }
        return state; // Return the original state if color not found
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  };