const logs = Array.from({ length: 10000 }).map((_, i) => ({ timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString() }));

console.time('date_getTime');
const sorted1 = [...logs].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
console.timeEnd('date_getTime');

console.time('string_compare');
const sorted2 = [...logs].sort((a, b) => a.timestamp < b.timestamp ? -1 : (a.timestamp > b.timestamp ? 1 : 0));
console.timeEnd('string_compare');
