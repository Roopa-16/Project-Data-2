function graphTsunamiCauseCodesByMonth(data) {
  var x_axis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  var cause_cd_0 = [];
  var cause_cd_1 = [];
  var cause_cd_2 = [];
  var cause_cd_3 = [];
  var cause_cd_4 = [];
  var cause_cd_5 = [];
  var cause_cd_6 = [];
  var cause_cd_7 = [];
  var cause_cd_8 = [];
  var cause_cd_9 = [];
  var cause_cd_10 = [];
  var cause_cd_11 = [];
  
  // Loop for January
  var counterCC0 = 0;
  var counterCC1 = 0;
  var counterCC2 = 0;
  var counterCC3 = 0;
  var counterCC4 = 0;
  var counterCC5 = 0;
  var counterCC6 = 0;
  var counterCC7 = 0;
  var counterCC8 = 0;
  var counterCC9 = 0;
  var counterCC10 = 0;
  var counterCC11 = 0;

  function countCodesPerMonth(month) {
    counterCC0 = 0;
    counterCC1 = 0;
    counterCC2 = 0;
    counterCC3 = 0;
    counterCC4 = 0;
    counterCC5 = 0;
    counterCC6 = 0;
    counterCC7 = 0;
    counterCC8 = 0;
    counterCC9 = 0;
    counterCC10 = 0;
    counterCC11 = 0;

    for(i = 0; i < data.length; i++) {
      if (data[i]["Mo"] == month) {
        switch (data[i]["Tsunami Cause Code"]) {
          case 0:
            counterCC0++;
            break;
          case 1:
            counterCC1++;
            break;
          case 2:
            counterCC2++;
            break;          
          case 3:
            counterCC3++;
            break;          
          case 4:
            counterCC4++;
            break;          
          case 5:
            counterCC5++;
            break;          
          case 6:
            counterCC6++;
            break;          
          case 7:
            counterCC7++;
            break;          
          case 8:
            counterCC8++;
            break;          
          case 9:
            counterCC9++;
            break;          
          case 10:
            counterCC10++;
            break;                        
          case 11:
            counterCC11++;
            break;  
        }
      }
    }
    cause_cd_0.push(counterCC0);
    cause_cd_1.push(counterCC1);
    cause_cd_2.push(counterCC2);
    cause_cd_3.push(counterCC3);
    cause_cd_4.push(counterCC4);
    cause_cd_5.push(counterCC5);
    cause_cd_6.push(counterCC6);
    cause_cd_7.push(counterCC7);
    cause_cd_8.push(counterCC8);
    cause_cd_9.push(counterCC9);
    cause_cd_10.push(counterCC10);
    cause_cd_11.push(counterCC11);  
  } // end function countCodesPerMonth()


  countCodesPerMonth(1);
  countCodesPerMonth(2);
  countCodesPerMonth(3);
  countCodesPerMonth(4);
  countCodesPerMonth(5);
  countCodesPerMonth(6);
  countCodesPerMonth(7);
  countCodesPerMonth(8);
  countCodesPerMonth(9);
  countCodesPerMonth(10);
  countCodesPerMonth(11);
  countCodesPerMonth(12);





  
}