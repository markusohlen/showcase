using System;
using System.Collections.Generic;

namespace Twentyone
{
    /// <summary>
    /// The main class where the application starts
    /// </summary>
    class Program
    {
        /// <summary>
        /// The starting point of the application
        /// </summary>
        static void Main()
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;

            // Console.Write("Ammount of players: ");
            int ammountOfPlayers = AmmountOfPlayers();
            Player[] players = CreatePlayers(ammountOfPlayers);

            Random random = new Random();
            Dealer dealer = new Dealer(random.Next(16, 22));

            Deck deck = new Deck();
            List<Card> unsortedDeck = deck.CreateDeck();
            Queue<Card> shuffledDeck = deck.Shuffle(unsortedDeck);

            Table table = new Table(players, dealer, shuffledDeck);

            table.PlayTwentyOne();
        }

        /// <summary>
        /// Creates players
        /// </summary>
        /// <param name="ammountOfPlayers">Ammount of players to be created</param>
        /// <returns>Collection of players</returns>
        static private Player[] CreatePlayers(int ammountOfPlayers)
        {
            Random random = new Random();
            List<Player> players = new List<Player>();
            for (int i = 0; i < ammountOfPlayers; i++)
            {
                int maxValue = random.Next(16, 22);
                Player player = new Player(maxValue);
                players.Add(player);
            }
            Player[] res = players.ToArray();
            return res;
        }

        /// <summary>
        /// Checks if the input is valid
        /// </summary>
        /// <returns>The ammount of players to be created</returns>
        static private int AmmountOfPlayers()
        {
            while (true)
            {
                try
                {
                    Console.Write("Ammount of players: ");
                    int count = int.Parse(Console.ReadLine());

                    if (count <= 0 || count >= 20) throw new IndexOutOfRangeException("Value must be greater than 0 and lesser than 20");

                    return count;
                }
                catch (IndexOutOfRangeException e)
                {
                    Console.WriteLine(e.Message);
                }
                catch (FormatException e)
                {
                    Console.WriteLine(e.Message);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    throw;
                }
            }
        }
    }
}
