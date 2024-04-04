import { range } from "rxjs";
import { map } from "rxjs";

const observable = range(0, 10)
    .pipe(
        map(x => x ** 2)
    );

observable.subscribe(console.log);