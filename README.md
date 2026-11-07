# brHolidays

Biblioteca TypeScript para consultar feriados brasileiros por ano ou intervalo de datas, verificar se uma data é feriado e contar dias úteis.

## Instalação

```bash
npm install brholidays
```

## Uso

### Listar os feriados de um ano

`listBrazillianHolidays` retorna uma lista ordenada de feriados. A data vem no formato `MM-DD`.

```ts
import { listBrazillianHolidays } from "brholidays";

const feriados = listBrazillianHolidays(2025);
console.log(feriados.slice(0, 2));
// [
//   { date: "01-01", name: "Ano Novo" },
//   { date: "03-03", name: "Segunda-Feira de Carnaval" }
// ]
```

Também é possível usar a função padrão ou o alias `brazillianHolidays`. Se o ano não for informado, será usado o ano atual.

```ts
import brazillianHolidays from "brholidays";

const feriadosDesteAno = brazillianHolidays();
```

### Listar feriados entre duas datas

`listHolidaysBetweenDates` recebe objetos `Date`. As datas inicial e final são incluídas no intervalo, e o resultado usa o formato `YYYY-MM-DD`.

```ts
import { listHolidaysBetweenDates } from "brholidays";

const feriados = listHolidaysBetweenDates(
  new Date(2025, 0, 1), // 1 de janeiro de 2025
  new Date(2025, 3, 30), // 30 de abril de 2025
);

console.log(feriados);
// Exemplo: { date: "2025-01-01", name: "Ano Novo" }
```

### Verificar se uma data é feriado

`isHoliday` retorna `true` quando a data informada corresponde a um feriado listado.

```ts
import { isHoliday } from "brholidays";

isHoliday(new Date(2025, 0, 1)); // true
isHoliday(new Date(2025, 0, 2)); // false
```

### Contar dias úteis em um intervalo

`countBusinessDaysBetweenDates` conta os dias de segunda a sexta-feira, excluindo os feriados listados. As datas inicial e final são consideradas na contagem.

```ts
import { countBusinessDaysBetweenDates } from "brholidays";

const diasUteis = countBusinessDaysBetweenDates(
  new Date(2025, 0, 1),
  new Date(2025, 0, 10),
);

console.log(diasUteis); // 7
```

Se a data inicial for posterior à data final, as funções de intervalo retornam uma lista vazia ou `0`.

## API

| Exportação                                          | Descrição                                                                              |
| --------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `listBrazillianHolidays(year)`                      | Lista os feriados do ano; `year` é opcional na função padrão.                          |
| `brazillianHolidays(year)`                          | Alias nomeado para a lista anual.                                                      |
| `listHolidaysBetweenDates(startDate, endDate)`      | Lista os feriados dentro do intervalo inclusivo.                                       |
| `isHoliday(date)`                                   | Verifica se a data corresponde a um feriado listado.                                   |
| `countBusinessDaysBetweenDates(startDate, endDate)` | Conta dias úteis no intervalo inclusivo, excluindo fins de semana e feriados listados. |

Os feriados de data fixa e variável são retornados como objetos `{ date, name }`. As funções usam o calendário local do ambiente JavaScript para interpretar os objetos `Date`.
