import * as yup from "yup";

const schema = yup.object({
  title: yup.string().min(5).max(50).required(),
  description: yup.string().min(10).max(100).required(),
  numberOfPlayers: yup.number().min(2).max(100).required(),
  entryFee: yup.number().min(1).max(1000).required(),
  prizeDistribution: yup.array().of(yup.object(
    {
      place: yup.number().min(1).required(),
      prize: yup.number().min(1).when('percentage',{
        is: (val) => val,
        then: (schema) => schema.max(100)
      }).required(),
      winners: yup.number().min(1).required(),
      percentage: yup.boolean()
    }
  )).test(
    'is-balance',
    ({ label }) => `Not all prizes is distributed`,
    (value, testContext) => {
      const total = testContext.parent.entryFee * testContext.parent.numberOfPlayers;
      const distributed = value.reduce((acc, d) => {
        if (d.percentage) {
          return acc + (total * d.prize/100) * d.winners
        }
        return acc + d.prize * d.winners
      }, 0);
      return total - distributed <= 0 ;
    },
  )
});

export default schema;
