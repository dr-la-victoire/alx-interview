#!/usr/bin/python3
"""This module solves the change problem with greedy algorithms"""


def makeChange(coins, total):
    """Returns the fewest number of coins needed to meet total"""
    # Initialization of the list
    change = [total + 1] * (total + 1)
    change[0] = 0  # base case

    # Main loop
    for a in range(1, total + 1):
        for coin in coins:
            if a - coin >= 0:
                change[a] = min(change[a], 1 + change[a - coin])

    if change[total] != (total + 1):
        return change[total]
    return -1  
    