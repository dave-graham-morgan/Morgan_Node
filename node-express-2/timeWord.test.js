const timeWord = require('./timeWord');

describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof timeWord).toBe('function');
  });
  test('test 00:00', function(){
    const res = timeWord("00:00");
    expect(res).toEqual("midnight")
  });
  test('test 12:00', function(){
    const res = timeWord("12:00");
    expect(res).toEqual("noon")
  });
  test('test 00:12', function(){
    const res = timeWord("00:12");
    expect(res).toEqual("twelve twelve am")
  });
  
  test('test 01:00', function(){
    const res = timeWord("01:00");
    expect(res).toEqual("one o'clock am")
  });
  test('test 13:00', function(){
    const res = timeWord("13:00");
    expect(res).toEqual("one o'clock pm")
  });
  test('test 06:01', function(){
    const res = timeWord("06:01");
    expect(res).toEqual("six oh one am")
  });
  test('test 18:01', function(){
    const res = timeWord("18:01");
    expect(res).toEqual("six oh one pm")
  });
  test('test 06:10', function(){
    const res = timeWord("06:10");
    expect(res).toEqual("six ten am")
  });
  test('test 18:18', function(){
    const res = timeWord("18:18");
    expect(res).toEqual("six eighteen pm")
  })
  test('test 06:18', function(){
    const res = timeWord("06:18");
    expect(res).toEqual("six eighteen am")
  });
  test('test 06:30', function(){
    const res = timeWord("06:30");
    expect(res).toEqual("six thirty am")
  });
  test('test 18:30', function(){
    const res = timeWord("18:30");
    expect(res).toEqual("six thirty pm")
  });
  test('test 10:34', function(){
    const res = timeWord("10:34");
    expect(res).toEqual("ten thirty four am")
  });
  test('test 22:34', function(){
    const res = timeWord("22:34");
    expect(res).toEqual("ten thirty four pm")
  });
  test('test 12:09', function(){
    const res = timeWord("12:09");
    expect(res).toEqual("twelve oh nine pm")
  });
  test('test 12:23', function(){
    const res = timeWord("12:23");
    expect(res).toEqual("twelve twenty three pm")
  });
});