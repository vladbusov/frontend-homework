'use strict';

QUnit.module('Тестируем функцию sort', function () {
	QUnit.test('Функция делает первую букву слова прописной', function (assert) {
		assert.strictEqual(sort('яяя'), 'Яяя', 'Работает с русским алфавитом');
		assert.strictEqual(sort('Бббббб'), 'Бббббб');
		assert.strictEqual(sort('zzzzzz'), 'Zzzzzz', 'Работает с английским алфавитом');
		assert.strictEqual(sort('Rrrrrrrr'), 'Rrrrrrrr');
	});

	QUnit.test('Функция делает все буквы, кроме первой, строчными', function (assert) {
		assert.strictEqual(sort('ЯЯЯЯ'), 'Яяяя', 'Работает с русским алфавитом');
		assert.strictEqual(sort('zZzZZzzZZZ'), 'Zzzzzzzzzz', 'Работает с английским алфавитом');
	});

	QUnit.test('Функция работает с предложениями', function (assert) {
		assert.strictEqual(sort('ЯЯЯ яяя яяя яяя'), 'Яяя Яяя Яяя Яяя');
		assert.strictEqual(sort('яяя яяяяя ЯЯЯЯ ЯяяяЯЯЯяя'), 'Яяя Яяяя Яяяяя Яяяяяяяяя');
	});

	QUnit.test('Функция сортирует буквы в отдельных словах по алфавиту', function (assert) {
		assert.strictEqual(sort('fedcba'), 'Abcdef', 'Работает с английским алфавитом');
		assert.strictEqual(sort('zyxwvu'), 'Uvwxyz');
		assert.strictEqual(sort('жёедгвба'), 'Абвгдеёж', 'Работает с русским алфавитом');
		assert.strictEqual(sort('вбава'), 'Аабвв');
	});

	QUnit.test('Функция сортирует слова в предложении по алфавиту', function (assert) {
		assert.strictEqual(sort('f e d c b a'), 'A B C D E F', 'Работает с английским алфавитом');
		assert.strictEqual(sort('z y x w v u'), 'U V W X Y Z');
		assert.strictEqual(sort('ж ё е д г в б а'), 'А Б В Г Д Е Ё Ж', 'Работает с русским алфавитом');
		assert.strictEqual(sort('в б а в а'), 'А А Б В В');
	});

	QUnit.test('Функция работает правильно', function (assert) {
		assert.strictEqual(sort('мама мыла раму'), 'Аамм Алмы Амру');
		assert.strictEqual(sort('космический корабль летит на марс'), 'Абклорь Амрс Ан Еиийккмоссч Еилтт');
		assert.strictEqual(sort('i love frontend'), 'Defnnort Elov I');
		assert.strictEqual(sort('hello world'), 'Dlorw Ehllo');
	});

	QUnit.test('Функция работает правильно с кириллицей и латинскими символами одновременно', function (assert) {
		assert.strictEqual(sort('Все любят JavaScript'), 'Блтюя Вес Aacijprstv');
		assert.strictEqual(sort('На stepic org мало курсов для JavaScript'), 'Алмо Ан Вкорсу Для Aacijprstv Ceipst Gor');
		assert.strictEqual(sort('Завтра топать в универ на политологию'), 'Аавзрт Ан Аоптть В Веинру Гииллоооптю');
		assert.strictEqual(sort('Интересно кто пойдет на политологию'), 'Ан Гииллоооптю Дейопт Ееиннорст Кот');
		assert.strictEqual(sort('Никто не пойдет на политологию'), 'Ан Гииллоооптю Дейопт Ен Икнот');
	});

	QUnit.test('Функция умеет читать мысли и стрелять лазером из глаз', function (assert) {
		assert.strictEqual(sort('Ночь улица фонарь аптека'), 'Ааекпт Аилуц Анорфь Ночь');
		assert.strictEqual(sort('Бессмысленный и тусклый свет'), 'Беейлмннсссыы Вест И Йклстуы');
		assert.strictEqual(sort('Живи еще хоть четверть века'), 'Авек Веерттчь Вжии Еещ Отхь');
		assert.strictEqual(sort('Все будет так Исхода нет'), 'Адиосх Акт Бдету Вес Ент');
		assert.strictEqual(sort('Умрешь начнешь опять сначала'), 'Ааалнсч Аеннчшь Емрушь Оптья');
		assert.strictEqual(sort('И повторится все как встарь'), 'Аврсть Акк Вес Виоопрсття И');
		assert.strictEqual(sort('Ночь ледяная рябь канала'), 'Аааклн Аделняя Брья Ночь');
		assert.strictEqual(sort('Аптека улица фонарь'), 'Ааекпт Аилуц Анорфь');
	});


});
