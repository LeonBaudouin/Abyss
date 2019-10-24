import { OnePageScroll } from "./Scroll/OnePageScroll";
import { GetWindowHeight } from "./Utils/UtilsFunctions";
import { EventProvider } from "./Events/EventProvider";

export function startFront() {
    const scrollButtons = document.querySelectorAll('.scrollBarButton');
    const pages = document.querySelectorAll('.page');
    const onePage = new OnePageScroll(10, 1000, GetWindowHeight(), [
        (i: number) => EventProvider.dispatch('scroll-to', i),
        (i: number) => {
            scrollButtons.forEach(scrollButton => {if (scrollButton.classList.contains('active')) scrollButton.classList.remove('active')})
            if (i > 1 && i < 9) scrollButtons[i - 2].classList.add('active')
        },
        (i: number) => {if (!pages[i].classList.contains('active')) pages[i].classList.add('active')},
        console.log
    ]);
    onePage.MoveTo(0);
    document.querySelector('.scrollButton').addEventListener('click', () => onePage.Next());
    scrollButtons.forEach(
        (element, index) => element.addEventListener('click', () => onePage.MoveTo(index + 2))
    )
}
