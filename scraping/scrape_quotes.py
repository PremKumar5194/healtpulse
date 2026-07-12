import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

base_url = "https://quotes.toscrape.com"
url = base_url

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

data = []

while url:
    try:
        response = requests.get(url, headers=headers, timeout=5)
        response.raise_for_status()  # raises an error if status code is 4xx/5xx
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        break  # stop the loop if something goes wrong

    soup = BeautifulSoup(response.text, "html.parser")
    all_quotes = soup.find_all("div", class_="quote")

    for quote_box in all_quotes:
        quote_text = quote_box.find("span", class_="text").get_text()
        author_name = quote_box.find("small", class_="author").get_text()
        data.append({"quote": quote_text, "author": author_name})

    next_button = soup.find("li", class_="next")
    if next_button:
        next_href = next_button.find("a")["href"]
        url = base_url + next_href
    else:
        url = None

    time.sleep(1)  # be polite - wait 1 second between requests

df = pd.DataFrame(data)
print(df)
print(f"Total quotes scraped : {len(df)}")

df.to_csv("scraping/quotes.csv", index=False)
print("Saved to scraping/quotes.csv")