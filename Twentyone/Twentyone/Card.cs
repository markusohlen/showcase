namespace Twentyone
{
    /// <summary>
    /// Creates a card
    /// </summary>
    public class Card : Deck
    {
        /// <summary>
        /// The color of a card
        /// </summary>
        private string _cardColor;

        /// <summary>
        /// The value of a card
        /// </summary>
        private int _cardValue;

        /// <summary>
        /// Property that sets and returns the color of a card
        /// </summary>
        public string CardColor
        {
            get
            {
                return _cardColor;
            }
            private set
            {
                _cardColor = value;
            }
        }

        /// <summary>
        /// Property that sets and returns the value of a card
        /// </summary>
        public int CardValue
        {
            get
            {
                return _cardValue;
            }
            private set
            {
                _cardValue = value;
            }
        }

        /// <summary>
        /// Constructor that creates a new card
        /// </summary>
        /// <param name="cardColor">The color of the new card</param>
        /// <param name="cardValue">The value of the new card</param>
        public Card(string cardColor, int cardValue)
        {
             string color = "";

            switch (cardValue)
            {
                case 14:
                    color = "A";
                    break;
                case 11:
                    color = "J";
                    break;
                case 12:
                    color = "Q";
                    break;
                case 13:
                    color = "K";
                    break;
                default:
                    color = cardValue.ToString();
                break;
            }

            color += cardColor.ToString();

            CardColor = color;
            CardValue = cardValue;
        }
    }
}
