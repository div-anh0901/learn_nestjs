function fib(n: number, memo: number[] = []): number {
    if (n <= 1) return n;
    if (memo[n] !== undefined) return memo[n];
    console.log(memo)
    return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  }

  console.log(fib(7))