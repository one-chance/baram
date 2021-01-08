import {createWorker} from 'tesseract.js'
import {loadImage} from 'tesseract.js/src/worker/node'
import fetch from 'node-fetch'
import ja from 'jpeg-autorotate'

export const getItemText = async (_fileName) => {
    var resp = await fetch(_fileName)
    var dat = await resp.arrayBuffer()

    try {
        dat = await ja.rotate(dat, { quality: 100 })
    } catch(_){}

    console.log(dat)

    var itemText = ""

    const worker = createWorker({
        logger: (m) => console.log(m),
    });
    await (async () => {
        await worker.load();
        await worker.loadLanguage('kor');
        await worker.initialize('kor');
        const { data: { text } } = await worker.recognize(dat);
        itemText = text
        await worker.terminate();
    })()

    console.log(itemText)
    return itemText
}