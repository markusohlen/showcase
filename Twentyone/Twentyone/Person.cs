using System;
using System.Collections.Generic;

namespace Twentyone
{
    /// <summary>
    /// A person
    /// </summary>
    abstract class Person
    {
        /// <summary>
        /// The person's value when he/she wants to stop draw cards
        /// </summary>
        private int _maxValue;

        /// <summary>
        /// The value of the whole hand
        /// </summary>
        public int HandValue { get; set; }

        /// <summary>
        /// The ammount of ace(s) a person has
        /// </summary>
        public int AmmontOfAce { get; set; }

        /// <summary>
        /// The cards in a person's hand
        /// </summary>
        /// <value></value>
        public List<Card> Hand { get; set; }

        /// <summary>
        /// Checks if the max value is a valid number
        /// </summary>
        public int MaxValue
        {
            get
            {
                return _maxValue;
            }
            private set
            {
                _maxValue = value;
            }
        }
        
        /// <summary>
        /// Creates a person with an empty hand and sets a max value for that person
        /// </summary>
        /// <param name="maxValue">The person's value when he/she wants to stop draw cards</param>
        public Person(int maxValue = 15)
        {
            Hand = new List<Card>();
            MaxValue = maxValue;
        }
    }
}
