# planner

NPM package to manage events

Methods

## HOW TO

```javascript
createEvent(payload); //<Event>
updateEvent(id, payload); //<Event>
getEvent(id); //<Event>
getEvents({
  range: start - end,
  status: 'active' | 'inactive' | 'deleted',
  owner: CalendarID,
}); // [<Event>]
deleteEvent(EventID); // ok|<Error>
```

### Issue

sort out how manage access by owner|creater|accessList field

### Schema

![Schema](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Copy%20of%20Scheduling.drawio#R7Rzbcto49GuY7j7A%2BI55hJCmne2FTpttui8dYQtwaxCRlQD9%2BpVs2ViybJzEgOm0D6l1dPHR0bkfmY55tdzeYLBevEc%2BDDuG5m875rhjGLpuu%2FQ%2FBtklEMflgDkOfD5oD%2Fgc%2FIIcqHHoQ%2BDDSBhIEApJsBaBHlqtoEcEGMAYbcRhMxSKb12DOSwAPnsgLEK%2FBj5ZJFDX6O%2Fhb2AwX6Rv1p1B0rME6WC%2Bk2gBfLTJgczrjnmFESLJ03J7BUNGvJQuybzXJb0ZYhiuSJ0Jm%2Bu39o0Lv%2Bvjf75P7iPjX%2F991DWtZJlHED7wHXNsyS4lAUYPKx%2ByVbSOOdosAgI%2Fr4HHejf00ClsQZYhben0MSIY%2FYRXKEQ4nm1q8T%2FaMwvCMIWv0IpOH80x8AOKfm74LP5H%2B3wQLeKX6rwxAYRAvIohhsagRQpwojxCTOA2B%2BIUuYFoCQne0SG8N%2BMzzp4Wb272Z23bHLbInbPpcCDg%2FDXPlt4fAX3gp%2FCEE9GLJzJ5mIaB1zGckL59NMX0aU7i%2Ff%2BBtBnyEjmqwf6NiVoDcmQdFCP9aGL0X6SjH0PDHWqLa%2F3etXbh1%2B9dvSBF149se%2BWHoh8%2BlCYIJVHK0N2eXSSWoSCWZR%2BJVkaBVlcYAgIpTE00uia1v%2FAkBLNFerkKzlIRq380%2FewUyeFTl4E3ESYLNEcrEF7voSNR9Pdj3iG05qT6AQnZcf8HPBAkEpLSD%2B%2Fu2HzKLbz5jS8XN8ZbobXjrdIDiNAD9mAFU3A3hgA8h%2BSwoDEaVB4nhiEgwaPoVjXOygO12H%2BBy3UYc%2FRLxB9gjx%2BQexxloNuDmqqgAe5%2BY9x%2FGn%2BdfLqbvyMfJs7m9tbxu%2BZZmHsbkLvcc8zYPd0Y8Paet1ljl2f0u3wjmWfYB2SCrTKBOKAUg%2FgpcqLUB0ZNOUkjhtMLShXagt%2BfeDBr4fyd%2BwcWoIyWdH8B9T6GtFdbb%2BnfmGpaAu8SdtSsz8r1USkgXRAGcz7Po8SlFBe6feghTPeL%2BBjGSjgMqM%2BSvbrgYqWAJNo0h5KIJ6MoVabyTApby7BFwYV7FgFCOCNJp8s6Zdwjyh%2FkC2W5ZEz8VIHUMVCAK%2F%2B8CKRrR2uwEuiSzBmLh5cfVe5un5B4SizPRjgM19RFy4ICOtcBS2avVtNoLRKoXZT8uFkxrcv6M5zjl12BkFIZYNVus5Eyyqq9nWonQ8%2BDUfQuiPigjj0Sd0SNzDKIIqbbRPztsRpXyfQyRyLwQDhMVOg4VrIjrlDHCXYjREfNwjixxMI%2BFv2hFeG2Vjd4%2BzVYBiEzgG9g%2BAjZqkdw1EVnxla56o7CmdGb8GYqbe5FW7mP0x9xYnPIY7E2mjcoWGCFcMsmWi3NZ9OmPsVqbxzhFnjkxQo1P4qyM0jW7vV6LVFfKjyZOaGsCaMDOAowtfK7jZgQlKu9ulv3g8fKt1cZtJJ3CEtetM61%2Bragc%2FsKnZuluAWdqzWgc9X5kX57Qki7Uy%2BAPFVOpV8zVhw0HSryqRMUMAuSFT8GUvrBGohLJBvis%2FKlJWkhayCyoe5a4kLJjgsLxQyW7ef5dr5o5sUEZmn655SJTMNsWSbzAgVVENPeoUTP8wW1blKn8ZyOWr70viSoMk%2FUFVRbyqabA2mh5gRVbRzsy%2BM50TjoTfCckjZuTZ47W8JdfYGgPMRKvC%2BF3zoF3s95fKpdLylHMg8Sz6d%2FUQaNQweKiyY8a9bfmXvLfKtuFB82m6dbKu%2FWSw1AMKN%2FVojEfj2L1cvcQ4kvWdwmshGG9KVgGg9gqKyZlMT0tGPfdu8m8hDQHMne5DLw%2FZinQzCF4SijQ72qbKVIFQxRdieGo9zJXztRGaiu1tMtfpzPVVjpEDSbRfAoKsQt8NvtmoVvLahU6oJuNSyzbmW3CROvLOcY51S3exX7LdfzNBPfb8TGqysgWlHhVpVKWqJwU7QvOqcl53rblc1SJnalhFZpbpcNL0nvHg%2FjLwEJS8oS58tvtOl%2Bki3f81PcUDK0U6rmFnnCRk1XmDoImuaICtp1M0BZuZ21Gqy3K2Kz06jteOoQY7DLDeBOYGnoZkpVEcuVbunK4%2B2Xje9rlsSaCcaN%2BmCGe3nMe4zcwQsZVGuXY2H8Bo5FViybYEStTEtvg6gKGXG9JJ6S7OHt%2BIkVqHPWjdZ7byieeP3h9n3iOL2CfkAQfpXE8a8eA7iBtPXEUtAfJya2BTV8GFWB3W3Ah1GrjPOkkPepOU0TKzc91zyxN%2BIUlf0lXP8zz2rBUyvdVguuONRKk9mSQ03x%2Fj0sOL9A0ELzLd7h%2BGOmqs2U6k6C8mMguRbVnLLTC0fT0qrTC3TWie4MZF9spVlu%2BSLJkSuI6T5zOu4GEparE67HVXyGd8aPl3THOmVJQC0MLUo81S7B9k9Ug02vaFxaEbbc8J%2B1CBuhGVMdPgxhxd3%2BCy28mk0WXg0nzam1t%2FKaCkeOy8bxybag9CpdazGsM2tZy1RIpEyglT9kv1Cxd8wKDl36kxNOPnjqGX1TVKO2U61In%2FLB20GVlv9pBAVJU9iL%2FQxT9DPkjwTqXnmSFyrcnSpxWJ6c6JcR1oTE%2FXES8VaNn%2B%2FIsZkXgigKvCpOExMsDUXcjV14PRXvSW6bnECrfS9WuvJZl%2FcaYw%2F7lOxx8MPb5%2FNH23STFAOZz%2BUPOT5wBw3xB23uf1koGb7%2FfSbz%2Bn8%3D)

### Cases

```javascript
async () => {
  const success = await EventCore.createEvent({
    title: 'Yoga Class',
    organizerId: user.id,
    startTime: 1070, // 17:50 = 17*60 + 50
    endTime: 1180, // 19:40 = 19*60 + 40
    startDate: moment('2019-02-08 09:30'), // required
    endDate: moment('2020-02-08 11:30'), // required
    duration: 110, // 1:50 = 60 + 50
    status: 'active',
    location: 'To Be Provided',
    repeatable: {
      dayOfWeek: {
        0: true, // Monday
        2: true, // Wednesday
        4: true, // Friday
      },
    },
  });

  const eventList = await EventCore.getList({
    startDate: moment('2019-04-08'), // required
    endDate: moment('2019-04-22'), // required
    owner: user.id, // optional
    accessID: user.id | profile.id | role.id, // optional
  });
  console.log(eventList.length); // 6

  const event = eventList[0];
  console.log(event);
  // {
  //  title: 'Yoga Class',
  //  organizerId: user.id,
  //  startDateTime: moment('2019-04-10 09:30'), // required
  //  endDateTime: moment('2020-04-10 11:30'), // required
  //  status: 'active',
  //  location: 'To Be Provided',
  // }

  event.meta = {
    some: 'none related to repeatable events',
  };

  event.attendees.add(user1.id);

  // {
  //  title: 'Yoga Class',
  //  organizerId: user.id,
  //  startDateTime: moment('2019-04-10 09:30'), // required
  //  endDateTime: moment('2020-04-10 11:30'), // required
  //  status: 'active',
  //  location: 'To Be Provided',
  //  attendees: [ user1.id ]
  //  meta: {
  //    some: 'none related to repeatable events'
  //  }
  // }

  event.save();
};
```
