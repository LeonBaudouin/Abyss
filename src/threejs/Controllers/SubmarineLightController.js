import AbstractController from "../Abstract/AbstractController.class";
import { EventProvider } from "../../front/Influencets/Events/EventProvider";

export default class SubmarineLightController extends AbstractController {
    constructor() {
        super();
        this.scrollIndex = 0;
        this.hasChanged = false;
        EventProvider.listenTo('scroll-to', (i) => {this.scrollIndex = i, this.hasChanged = true});
    }

    update(object3d, time) {
        if (this.hasChanged) {
            if (this.scrollIndex == 8) {
                object3d.intensity = 0.3;
            } else {
                object3d.intensity = 2;
            }
        }
    }


}