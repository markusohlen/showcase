using System;
using System.Collections.Generic;

namespace Twentyone
{
    /// <summary>
    /// Methods for a deck
    /// </summary>
    public class Deck
    {
        /// <summary>
        /// Creates a new deck
        /// </summary>
        /// <returns>Unshuffled deck</returns>
        public List<Card> CreateDeck()
        {
            List<Card> deck = new List<Card>();

            string[] types = {"\u2665", "\u2660", "\u2663", "\u2666"};
            int[] values = { 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 };

            foreach (int value in values) 
            {
                foreach (string type in types) 
                {
                    Card card = new Card(type, value);
                    deck.Add(card);
                }
            }

            return deck;
        }

        /// <summary>
        /// Shuffles a deck
        /// </summary>
        /// <param name="deck">The deck to be shuffled</param>
        /// <returns>Shuffled deck</returns>
        public Queue<Card> Shuffle(List<Card> deck)
        {
            Random random = new Random();

            for (int i = 0; i < deck.Count - 1; i++)
            {
                int cardTwoPosition = random.Next(0, deck.Count - i);

                Card temp = deck[i];
                deck[i] = deck[cardTwoPosition];
                deck[cardTwoPosition] = temp;
            }

            Queue<Card> shuffledDeck = new Queue<Card>(deck);

            return shuffledDeck;
        }
    }
}
