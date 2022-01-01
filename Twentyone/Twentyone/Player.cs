namespace Twentyone
{
    /// <summary>
    /// Player that inherits from a person
    /// </summary>
    class Player : Person
    {
        /// <summary>
        /// Creates a new player
        /// </summary>
        /// <param name="maxValue">The player's value when he/she wants to stop draw cards</param>
        public Player(int maxValue) : base(maxValue)
        {
        }
    }
}
