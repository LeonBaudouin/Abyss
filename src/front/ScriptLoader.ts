import { OnePageScroll } from "./Scroll/OnePageScroll";
import { GetWindowHeight } from "./Utils/UtilsFunctions";
import { EventProvider } from "./Influencets/Events/EventProvider";
import { transformRange } from "./Influencets/CustomTypes/Interval";
import { CanvasSetup } from "./CanvasSetup";
import { Canvas } from "./Influencets/Canvas";

export function startFront() {
    processData();
    const scrollButtons = document.querySelectorAll('.scrollBarButton');
    const pages = document.querySelectorAll('.page');
    const onePage = new OnePageScroll(10, 1000, GetWindowHeight(), [
        (i: number) => EventProvider.dispatch('scroll-to', i),
        (i: number) => {
            scrollButtons.forEach(scrollButton => {if (scrollButton.classList.contains('active')) scrollButton.classList.remove('active')})
            if (i > 1 && i < 9) scrollButtons[i - 2].classList.add('active')
        },
        (i: number) => {if (!pages[i].classList.contains('active')) pages[i].classList.add('active')}
    ]);
    onePage.MoveTo(0);
    document.querySelector('.scrollButton').addEventListener('click', () => onePage.Next());
    scrollButtons.forEach(
        (element, index) => element.addEventListener('click', () => onePage.MoveTo(index + 2))
    )
}

function processData() {
    const entryXInterval = {min: 0, max: 27.52};
    const exitXInterval = {min: 1750, max: 2020};
    const entryYInterval = {min: 0, max: 11.75};
    const exitYInterval = {min: 0, max: 3000};
    fetch('./assets/data.csv')
        .then(res => res.text())
        .then(text =>
            text.split(/\r\n|\n/)
                .slice(1)
                .map(cur => {
                    const coords = cur.split(',')
                    const x = exitXInterval.min + transformRange(parseFloat(coords[0]), entryXInterval, exitXInterval)
                    const y = transformRange(entryYInterval.max - parseFloat(coords[1]), entryYInterval, exitYInterval)
                    return {x, y};
                })
        )
        .then((data) => {
            console.log(data)
            const canvas = CanvasSetup(data);
            gameLoop(canvas);
        })
}

function gameLoop(canvas: Canvas) {
    requestAnimationFrame(() => gameLoop(canvas))
    canvas.Loop()
}
