# Описание
Компонент вывода рейтинга в виде звезд. Имеет режимы `Readonly` (для вывода рейтинга) и `input режим` (для выбора рейтинга).
+ [Использование в VueJS](#использование-в-vuejs)
+ [Использование в NuxtJS](#использование-в-nuxtjs)
+ [Параметры (props)](#параметры-props)
+ [Слоты](#слоты)
+ [Скрипты](#скрипты)


# Использование в VueJS

## Глобальное подключение
Добавьте следующий код в файл `main.js`:

```
import iceRatingStar from 'ice-cmp-rating-star';
Vue.use(iceRatingStar);
```

*[вверх↑](#описание)*

## Локальное подключение в компонентах

```
<template>
  <div>
      <ice-rating-star
        v-model="rating"
        :readonly="readonly"
        :size="size"
        :step="step"
        :margin="margin"
        :count="count"
      />
  </div>
</template>
<script>
import iceRatingStar from 'ice-cmp-rating-star';
  export default {
    name: 'someComponent',
    components: {
      iceRatingStar,
    },
    data: ()=>({
      rating: 1,
      readonly: false,
      count: 5,
      size: 45,
      step: 10,
      margin: 5,
    })
  }
</script>
```
*[вверх↑](#описание)*

# Использование в NuxtJS
Создайте файл плагина с именем `rating-star.js` в папке `./plugins`, и добавьте в него следующий текст:

```
import Vue from 'vue';
import IceRatingStar from 'ice-cmp-rating-star';

Vue.component('IceRatingStar', IceRatingStar);
```

После этого подключите этот плагин в файле `nuxt.config.js` в блоке `plugins`:

```
  plugins: [
    { src: '@plugins/rating-star.js', ssr: false },
  ],
```

Ипользуйте компонент в своем проекте следующим образом:

```
 <client-only>
  <ice-rating-star
    :value="5"
    :size="15"
    readonly
  />
</client-only>
```

# Параметры (props)
<table class="table" style="width: 100%">
  <thead>
    <tr>
      <th>Название</th>
      <th>Обязателено</th>
      <th>По-умолчанию</th>
      <th>Значение</th>
      <th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>v-model или value</td>
      <td align="center">✓</td>
      <td align="center">-</td>
      <td>от 0 до 1 (дробное)</td>
      <td>Входной параметр рейтинга</td>
    </tr>
    <tr>
      <td>count</td>
      <td align="center">-</td>
      <td align="center">5</td>
      <td>Целое число</td>
      <td>Максимальное количество звезд</td>
    </tr>
    <tr>
      <td>size</td>
      <td align="center">-</td>
      <td align="center">40</td>
      <td>Число в px</td>
      <td>Размер звезд в px (width и height)</td>
    </tr>
    <tr>
      <td>step</td>
      <td align="center">-</td>
      <td align="center">1</td>
      <td>Число в % (от 1 до 100)</td>
      <td>Шаг округления значений в процентах</td>
    </tr>
    <tr>
      <td>margin</td>
      <td align="center">-</td>
      <td align="center">0</td>
      <td>Число в px</td>
      <td>Отступ между звезд</td>
    </tr>
    <tr>
      <td>readonly</td>
      <td align="center">-</td>
      <td align="center">false</td>
      <td>Boolean</td>
      <td>true - отключение решима редактирования</td>
    </tr>
    <tr>
      <td>activeColor</td>
      <td align="center">-</td>
      <td align="center">#ffd347</td>
      <td>HEX color</td>
      <td>Цвет заливки активных звезд</td>
    </tr>
    <tr>
      <td>backgroundColor</td>
      <td align="center">-</td>
      <td align="center">#e2e2e2</td>
      <td>HEX color</td>
      <td>Цвет заливки "серых" звезд</td>
    </tr>
    <tr>
      <td>showLabel</td>
      <td align="center">-</td>
      <td align="center">false</td>
      <td>Boolean</td>
      <td>Выводит текущий рейтинг в виде понятных значений. Пример: 3.5/5. Внимание! Работает только с параметром `readonly` = true</td>
    </tr>
    <tr>
      <td>labelPos</td>
      <td align="center">-</td>
      <td align="center">right</td>
      <td>String (top, right, left, bottom)</td>
      <td>Позиционирование label относительно звезд</td>
    </tr>
    <tr>
      <td>labelClassName</td>
      <td align="center">-</td>
      <td align="center">-</td>
      <td>String</td>
      <td>Название класса для кастомизации label значений</td>
    </tr>
  </tbody>
</table>

*[вверх↑](#описание)*

# Слоты

## `active`
Можно использовать именованые слоты, `active` и `background` и использовать свои SVG звезды согласно макету, пример:

```
<template #active>
  <svg viewBox="0 -10 511.99143 511" ><path d="m510.652344........></svg>
</template>
```

## `background`
```
<template #background>
  <svg viewBox="0 -10 511.99143 511" ><path d="m510.652344........></svg>
</template>
```

## `label`
Используется для кастомизации вывода значений рейтинга
```
<template #label="{ value, count }">
  ({{value}} из {{count}})
</template>
```

*[вверх↑](#описание)*

# Скрипты

0. Разработка - `npm run serve`;
1. Сборка библиотеки - `npm run build`;
2. Сборка демо проекта - `npm run predeploy`;
