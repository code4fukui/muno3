# muno3

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A simple, rule-based conversational chatbot written in JavaScript. It can recite classical Japanese poetry, perform calculations, answer questions about local Sabae tourism, and query for information on Toyama eateries.

## Demo

**[Try muno3 (人工無能 ver 3.1)](https://code4fukui.github.io/muno3/)**

## Features

-   **Conversational Responses:** Handles common greetings (time-aware), farewells, and simple questions like "What's your name?" or "What can you do?".
-   **Hyakunin Isshu (百人一首):** Recites a random poem from the 100 classical *waka* poems or finds a poem based on the first few words.
-   **Date & Time:** Answers questions about the current time, day of the week, and the current year's zodiac sign (干支).
-   **Calculations:** Can perform multiplication table drills (九九), split-the-bill calculations (割勘), and evaluate simple formulas.
-   **Simple Knowledge Base:** Answers predefined questions about places, concepts, and cultural facts (e.g., "福井県の人口は？", "七草とは？") using an internal dictionary.
-   **Local Information:** Provides information on Sabae City tourist spots and can query for Toyama Prefecture eateries using the `opendata-toyama` library.

## Usage

1.  Clone this repository.
2.  Open `index.html` in a web browser.
3.  Type a message in the input box and press "発言" (Speak).

**Example Queries:**
-   `こんにちは` (Hello)
-   `詠んで` or `百人一首` (Recite a poem)
-   `今何時？` (What time is it?)
-   `福井県の名物は？` (What are Fukui's famous products?)
-   `富山のラーメン` (Ramen in Toyama)

## Dependencies

This project runs in the browser and relies on several JavaScript modules and external data sources.

-   **JS Modules:**
    -   [CSV.js](https://code4fukui.github.io/CSV/CSV.js)
    -   [rnd.js](https://js.sabae.cc/rnd.js)
    -   [Num.js](https://js.sabae.cc/Num.js)
-   **Data Source Library:**
    -   [EateryToyama.js](https://code4fukui.github.io/opendata-toyama/EateryToyama.js) from [富山県オープンデータ](https://github.com/code4fukui/opendata-toyama/)

## Base Project

This project is based on the original work described in [人工無能による鯖江の観光案内](https://fukuno.jig.jp/171).
