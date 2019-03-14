from typing import List, Tuple
from datetime import date, timedelta

filename = 'test'
title = '123'
event_ID = '456'
place_order = ['103', '104', '202']

one_day = timedelta(days = 1)

def give_newdate(l: List[Tuple[date, date]], weekday: List[int], iso = True):
	sol = []
	for start, end in l:
		pass

if __name__ == '__main__':
	with open('template', 'r', newline = '', encoding = 'utf-8') as file:
		content = file.read()
	output = content.format(title = title, event_ID = event_ID, place_order = ', '.join(place_order), dates = '')
	with open(filename, 'w', newline = '\n', encoding = 'utf-8') as file:
		file.write(output)