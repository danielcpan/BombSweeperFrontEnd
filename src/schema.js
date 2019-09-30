import { normalize, schema } from 'normalizr';

export const scoreSchema = new schema.Entity('scores', {

}, { idAttribute: '_id' });

export const leaderboardSchema = [scoreSchema];
