using System;
using System.Collections.Generic;

namespace Twentyone
{
    /// <summary>
    /// A table where the game is played
    /// </summary>
    class Table
    {
        /// <summary>
        /// Shuffled collection of cards to be played
        /// </summary>
        public Queue<Card> Deck { get; set; }

        /// <summary>
        /// Collection of all used cards
        /// </summary>
        public List<Card> UsedCards { get; set; }

        /// <summary>
        /// Collection of players
        /// </summary>
        public Player[] Players { get; set; }

        /// <summary>
        /// The dealer
        /// </summary>
        public Dealer Dealer { get; set; }
        
        /// <summary>
        /// Creates a table and sets the deck, players and dealer to corresponding values
        /// </summary>
        /// <param name="players">Collection of players</param>
        /// <param name="dealer">The dealer</param>
        /// <param name="deck">Collection of cards</param>
        public Table(Player[] players, Dealer dealer, Queue<Card> deck)
        {
            UsedCards = new List<Card>();
            Deck = deck;
            Players = players;
            Dealer = dealer;
        }

        /// <summary>
        /// The entry point of the game twentyone
        /// </summary>
        public void PlayTwentyOne()
        {
            try
            {
                foreach (Player player in Players) DealCard(player);

                int index = 0;
                foreach (Player player in Players)
                {
                    PlayHand(player);

                    string winner = "";
                    Console.WriteLine("\n\n");
                    if (player.HandValue > 21)
                    {
                        winner = "Dealer";
                    }
                    else if (player.HandValue == 21)
                    {
                        winner = "Player";
                    }
                    else
                    {
                        PlayHand(Dealer);

                        if (Dealer.HandValue == 21 
                            || Dealer.HandValue >= player.HandValue && Dealer.HandValue <= 21)
                        {
                            winner = "Dealer";
                        }
                        else
                        {
                            winner = "Player";
                        }
                    }

                    Render(player, index, winner);
                    index++;

                    DiscardCards(Dealer);
                    DiscardCards(player);
                    Dealer.AmmontOfAce = 0;
                    Dealer.HandValue = 0;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("ERROR: " + e);
                throw;
            }
            
        }

        /// <summary>
        /// A person plays the hand
        /// </summary>
        /// <param name="person">The player or dealer that plays</param>
        private void PlayHand(Person person)
        {
            while (person.HandValue < person.MaxValue && person.Hand.Count <= 4)
                {
                    DealCard(person);

                    if (person.AmmontOfAce != 0 && person.HandValue > 21)
                    {
                        person.HandValue -= 13;
                        person.AmmontOfAce --;
                    }
                }
        }

        /// <summary>
        /// Renders the result
        /// </summary>
        /// <param name="player">The player that is currently playing</param>
        /// <param name="i">The number of the current player</param>
        /// <param name="winner">The winner of the current game</param>
        private void Render(Player player, int i, string winner)
        {
            Console.WriteLine($"Player #{(i + 1).ToString()}: {GetHand(player)}");
            Console.WriteLine($"Dealer: {(Dealer.HandValue == 0 ? "-" : GetHand(Dealer))}");
            Console.WriteLine($"{winner} winns!");
        }

        /// <summary>
        /// Takes the values from a person's hand and returns the hand as a string
        /// </summary>
        /// <param name="person">The dealer or player</param>
        /// <returns>The person's hand as a string</returns>
        private string GetHand(Person person)
        {
            string hand = "";
            foreach (Card card in person.Hand)
            {
                hand += card.CardColor.ToString() + " ";
            }
            hand += $"({person.HandValue})";

            return hand;
        }

        /// <summary>
        /// Discard a person's hand and add the card(s) to a collection with all used cards
        /// </summary>
        /// <param name="person">The player or dealer</param>
        private void DiscardCards(Person person)
        {
            int handCount = person.Hand.Count;
            for (int i = 0; i < handCount; i++)
            {
                Card card = person.Hand[0];
                UsedCards.Add(card);
                person.Hand.Remove(card);
                person.HandValue -= card.CardValue;
            }
        }

        /// <summary>
        /// Deal a card to a player
        /// </summary>
        /// <param name="person">The player or dealer</param>
        public void DealCard(Person person)
        {
            if (Deck.Count == 1)
            {
                Deck d = new Deck();
                UsedCards.Add(Deck.Dequeue());
                Deck = d.Shuffle(UsedCards);
            }
            Card card = Deck.Dequeue();
            person.Hand.Add(card);
            person.HandValue += card.CardValue;

            if (card.CardValue == 14)
            {
                person.AmmontOfAce ++;
            }
        }
    }
}
