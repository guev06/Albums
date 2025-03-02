# from schemas.album import Album
# from typing import List
# import asyncio


# mockAlbums = [
#     Album(
#         id=1,
#         title="Because the Internet",
#         artist="Childish Gambino",
#         year=2013,
#         genre=10,  # Rap -> 11, Hip Hop -> 10
#         cover="https://t2.genius.com/unsafe/600x600/https%3A%2F%2Fimages.genius.com%2F2114312d382ad914c2c7b6146fbfb6c2.703x703x7.gif",
#         stream="https://open.spotify.com/album/5h0KYWMZIg8xT6eRGYkNMh"
#     ),
#     Album(
#         id=2,
#         title="Camp",
#         artist="Childish Gambino",
#         year=2011,
#         genre=10,  # Rap -> 11, Hip Hop -> 10
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2F84e84f918a6b65616031289ce5ab2f4d.1000x1000x1.png",
#         stream="https://open.spotify.com/album/01MRGgNbfWrE291tQjw9ta"
#     ),
#     Album(
#         id=3,
#         title="DAMN.",
#         artist="Kendrick Lamar",
#         year=2017,
#         genre=9,  # Rap -> 11, Hip Hop -> 10, Conscious Hip Hop -> 9
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2Ff3f77222e1b615e0a10354ea6282ff22.1000x1000x1.png",
#         stream="https://open.spotify.com/album/4eLPsYPBmXABThSJ821sqY"
#     ),
#     Album(
#         id=4,
#         title="good kid, m.A.A.d city",
#         artist="Kendrick Lamar",
#         year=2012,
#         genre=9,  # Rap -> 11, Hip Hop -> 10, Conscious Hip Hop -> 9
#         cover="https://t2.genius.com/unsafe/378x378/https%3A%2F%2Fimages.genius.com%2Fb4d6d87f080c362200ce55ed35ec65bb.1000x1000x1.png",
#         stream="https://open.spotify.com/album/748dZDqSZy6aPXKcI9H80u"
#     ),
#     Album(
#         id=5,
#         title="Blonde",
#         artist="Frank Ocean",
#         year=2016,
#         genre=4,  # R&B -> 3, Alternative R&B -> 4
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2F750737a023d383b93057b73d546bfe4e.1000x1000x1.png",
#         stream="https://open.spotify.com/album/3mH6qwIy9crq0I9YQbOuDf"
#     ),
#     Album(
#         id=6,
#         title="Channel ORANGE",
#         artist="Frank Ocean",
#         year=2012,
#         genre=2,  # R&B -> 3, Soul -> 2
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2F6523ef2dbe975dd04570ee626edf53ca.1000x1000x1.png",
#         stream="https://open.spotify.com/album/392p3shh2jkxUxY2VHvlH8"
#     ),
#     Album(
#         id=7,
#         title="My Beautiful Dark Twisted Fantasy",
#         artist="Kanye West",
#         year=2010,
#         genre=10,  # Hip Hop -> 10, Pop -> 8
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2F97300f5421ff3c645217d0d1dfef2dd6.1000x1000x1.jpg",
#         stream="https://open.spotify.com/album/20r762YmB5HeofjMCiPMLv"
#     ),
#     Album(
#         id=8,
#         title="Late Registration",
#         artist="Kanye West",
#         year=2005,
#         genre=9,  # Hip Hop -> 10, Conscious Hip Hop -> 9
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2F2269c6771e45d4bb6000d67f0c590932.1000x1000x1.png",
#         stream="https://open.spotify.com/album/5ll74bqtkcXlKE7wwkMq4g"
#     ),
#     Album(
#         id=9,
#         title="Lemonade",
#         artist="Beyoncé",
#         year=2016,
#         genre=3,  # R&B -> 3, Pop -> 8
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2F5fec86ce8713de9eadfe2eee65b25609.1000x1000x1.png",
#         stream="https://open.spotify.com/album/7dK54iZuOxXFarGhXwEXfF"
#     ),
#     Album(
#         id=10,
#         title="21",
#         artist="Adele",
#         year=2011,
#         genre=2,  # Pop -> 8, Soul -> 2
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2Fb0ea0d0107d6f8fd1c7d320e99f47897.1000x1000x1.png",
#         stream="https://open.spotify.com/album/5duyQokC4FMcWPYTV9Gpf9"
#     ),
#         Album(
#         id=11,
#         title="AM",
#         artist="Arctic Monkeys",
#         year=2013,
#         genre=6,  # Indie Rock -> 6
#         cover="https://t2.genius.com/unsafe/600x600/https%3A%2F%2Fimages.genius.com%2F8189e957069d9b6c7accea66c7fbab10.1000x1000x1.png",
#         stream="https://open.spotify.com/album/78bpIziExqiI9qztvNFlQu"
#     ),
#     Album(
#         id=12,
#         title="Fake It Flowers",
#         artist="beabadoobee",
#         year=2020,
#         genre=5,  # Indie Pop -> 5
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2F67d1f966e41aab65acf2f056da941a5c.1000x1000x1.png",
#         stream="https://open.spotify.com/album/3SGFxGF2loXeOFZtKvdmxo"
#     ),
#     Album(
#         id=13,
#         title="IGOR",
#         artist="Tyler, The Creator",
#         year=2019,
#         genre=12,  # Alt Hip-Hop -> 12
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2F99d79385685ab3a4b7a7ccbc6fd27310.1000x1000x1.png",
#         stream="https://open.spotify.com/album/5zi7WsKlIiUXv09tbGLKsE"
#     ),
#     Album(
#         id=14,
#         title="Good & Evil",
#         artist="Tally Hall",
#         year=2011,
#         genre=5,  # Alt Rock -> 7
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2Fb0a20cc64d99b2353311bf20e2e27d3e.1000x1000x1.png",
#         stream="https://open.spotify.com/album/2Vq0Y8wgiZRYtZ1mQ7zOMG"
#     ),
#     Album(
#         id=15,
#         title="i am > i was",
#         artist="21 Savage",
#         year=2018,
#         genre=11,  # Hip-Hop -> 10
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2Fb47acec06a9a9df343104f2d5220acaf.850x850x1.jpg",
#         stream="https://open.spotify.com/album/007DWn799UWvfY1wwZeENR"
#     ),
#     Album(
#         id=16,
#         title="Back to Black",
#         artist="Amy Winehouse",
#         year=2006,
#         genre=2,  # Soul -> 2
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2F2517e498e32bcb597265cf923480e473.1000x1000x1.png",
#         stream="https://open.spotify.com/track/3FAclTFfvUuQYnEsptbK8w"
#     ),
#     Album(
#         id=17,
#         title="The Eminem Show",
#         artist="Eminem",
#         year=2002,
#         genre=11,  # Rap -> 11
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2F2770c9753f53f4042f5bee4716e3c9b9.998x998x1.png",
#         stream="https://open.spotify.com/album/2cWBwpqMsDJC1ZUwz813lo"
#     ),
#     Album(
#         id=18,
#         title="2001",
#         artist="Dr. Dre",
#         year=1999,
#         genre=11,  # Rap -> 11
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2F8ebe17a1fecbeecb673ecac71cafdae3.640x640x1.png",
#         stream="https://open.spotify.com/album/7q2B4M5EiBkqrlsNW8lB7N"
#     ),
#     Album(
#         id=19,
#         title="Red Moon In Venus",
#         artist="Kali Uchis",
#         year=2023,
#         genre=2,  # Soul -> 2
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2F2eb9ce93a389499c7600486814b661c0.1000x1000x1.png",
#         stream="https://open.spotify.com/search/red%20moon%20in%20venus"
#     ),
#     Album(
#         id=20,
#         title="Hot Pink",
#         artist="Doja Cat",
#         year=2019,
#         genre=8,  # Pop -> 8
#         cover="https://t2.genius.com/unsafe/781x0/https%3A%2F%2Fimages.genius.com%2F01324b29e22be923c4ec8da1a3c0a04f.1000x1000x1.png",
#         stream="https://open.spotify.com/album/1MmVkhiwTH0BkNOU3nw5d3"
#     )
# ]


# async def get_albums_from_db():
#     return mockAlbums


# async def get_albums_by_id(id):
#     album = list(filter(lambda album: album.id == id, mockAlbums))
#     return album

# async def add_album(album:Album):
#     global id_cnt
#     await asyncio.sleep(0.1)
#     new_album=Album(
#         id=max([album.id for album in mockAlbums])+1,
#         year=album.year,
#         title=album.title,
#         genre=album.genre,
#         artist=album.artist,
#         cover= album.cover,
#         stream= album.stream,
#     )
#     print(new_album.id)
#     mockAlbums.append(new_album)
#     print(mockAlbums)
#     return album

