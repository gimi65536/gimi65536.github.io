from typing import List, Tuple, Set
from datetime import date, timedelta

mask = {0, 1, 2, 3, 4, 5, 6}

def give_newdate(l: List[Tuple[date, date]], weekday: Set[int], iso = True):
	sol = []
	if iso:
		weekday = {i - 1 for i in weekday}
	weekday = weekday & mask
	for start, end in l:
		n = (end - start).days
		start_weekday = start.weekday()
		pick = [i for i in range(n + 1) if (i + start_weekday) % 7 in weekday]
		pick_date = [start + timedelta(days = i) for i in pick]
		sol.extend(pick_date)
	return sol

def write_html(filename: str, title: str, event_ID: str, place_order: List[str], l: List[Tuple[date, date]], weekday: Set[int]):
	with open('template', 'r', newline = '', encoding = 'utf-8') as file:
		content = file.read()
	output = content.format(title = title, event_ID = event_ID, place_order = ', '.join(place_order), 
		dates = ',\n\t\t\t'.join(f'new Date(Date.UTC({d.year}, {d.month - 1}, {d.day}))' for d in give_newdate(l, weekday)))
	with open(filename, 'w', newline = '\n', encoding = 'utf-8') as file:
		file.write(output)

if __name__ == '__main__':
	write_html('107_4/chuangzuo.html', '創作組', '98652', ['103', '104', '202'], [(date(2019, 4, 15), date(2019, 6, 23))], {5})
	write_html('107_4/qimosheda.html', '期末社大', '98653', ['103', '104', '202'], [(date(2019, 6, 3), date(2019, 6, 14))], {1, 3})
	write_html('107_4/jiaoxue.html', '教學組', '98655', ['103', '104', '202'], [(date(2019, 4, 22), date(2019, 6, 14))], {2})