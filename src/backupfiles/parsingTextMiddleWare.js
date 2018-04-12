// import fetchText from './fetchText';
//
// export default function parsingTextMiddleWare() {
//   return (dispatch, getState, socket) => {
//     return fetchText().then(text => {
//       // Parse inputs from text
//       let inputArray = text.split('\n');
//
//       if (inputArray.length < 2) {
//         return 'Invalid input';
//       }
//
//       let lineOne = inputArray[0].split(' ').map(Number);
//       let numPrice = lineOne[0];
//       let windowSize = lineOne[1];
//       let sales = inputArray[1].split(' ').map(Number);
//
//       //validating parsing values
//       if (sales.length <= 1 && sales[0] <= 0) {
//         return 'there are no sales';
//       } else if (windowSize > sales.length) {
//         return 'windowSize is too great compared to sales';
//       } else if (windowSize <= 0) {
//         return 'windowSize could not be zero';
//       }
//
//       let result = {};
//
//       for (
//         let priceIdx = 0;
//         priceIdx < sales.length - windowSize + 1;
//         priceIdx++
//       ) {
//         let windowPrices = sales.slice(0 + priceIdx, windowSize + priceIdx);
//         let count = 0;
//         let isIncreasing = true; //window price increases
//         result[priceIdx] = 0;
//
//         for (let windowIdx = 0; windowIdx < windowPrices.length; windowIdx++) {
//           if (windowPrices[windowIdx] < windowPrices[windowIdx + 1]) {
//             if (count === 0 || isIncreasing === true) {
//               count += 1;
//             } else {
//               count = 1;
//               isIncreasing = true;
//             }
//             result[priceIdx] = count + result[priceIdx];
//           } else if (windowPrices[windowIdx] > windowPrices[windowIdx + 1]) {
//             if (count === 0 || isIncreasing === false) {
//               count += 1;
//             } else {
//               count = 1;
//               isIncreasing = false;
//             }
//             result[priceIdx] = result[priceIdx] - count;
//           } else if (windowPrices[windowIdx] === windowPrices[windowIdx + 1]) {
//             count = 0;
//           }
//         }
//       }
//
//       for (let keys in result) {
//         console.log(result[keys]);
//       }
//     });
//   };
// }
