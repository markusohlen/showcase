namespace Twentyone
{
    /// <summary>
    /// Dealer that inherits from a person
    /// </summary>
    class Dealer : Person
    {
        /// <summary>
        /// Creates a dealer
        /// </summary>
        /// <param name="maxValue">The dealer's value when he/she wants to stop draw cards</param>
        public Dealer(int maxValue) : base(maxValue)
        {
        }
    }
}
