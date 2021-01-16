import { Position, Toaster } from "@blueprintjs/core";
 
/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster = Toaster.create({
    className: "",
    position: Position.TOP
});

export const AppToasterBottomLeft = Toaster.create({
    className: "",
    position: Position.BOTTOM_LEFT
});

export const AppToasterBottomRight = Toaster.create({
    className: "",
    position: Position.BOTTOM_RIGHT
});