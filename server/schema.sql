CREATE TABLE IF NOT EXISTS media (id SERIAL PRIMARY KEY,
                                    title TEXT NOT NULL, 
                                    type TEXT NOT NULL
                                        CHECK (type IN ('movie', 'anime', 'video')),
                                    status TEXT NOT NULL
                                        CHECK (status IN ('planned', 'watching', 'completed')) ,
                                    description TEXT);