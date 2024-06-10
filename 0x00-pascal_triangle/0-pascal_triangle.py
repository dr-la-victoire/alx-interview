#!/usr/bin/python3
"""This program returns a list of ints representing the Pascal's Triangle"""


def pascal_triangle(n):
    """This function returns a list of ints repr Pascal's Triangle"""
    if n <= 0:
        return []

    mega_list = [[1]]

    for i in range(1, n):
        sub_list = [1]
        for j in range(1, i):
            sub_list.append(mega_list[i - 1][j - 1] + mega_list[i - 1][j])
        sub_list.append(1)
        mega_list.append(sub_list)
    return mega_list
