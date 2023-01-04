import React from "react";
import {Pattern} from "../utils/Pattern";

export const currentPatternContext = React.createContext(new Pattern([],"","",0,0,"", false));