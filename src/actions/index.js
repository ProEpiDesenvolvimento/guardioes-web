import {
  LOAD_MAKES,
  SET_TOKEN,
  SET_USER,
  SET_EMAIL,
  SET_APPS,
  SET_SYMPTOMS,
  SET_CONTENTS,
  SET_RUMORS,
  SET_CITY_MANAGERS,
  SET_GROUP_MANAGERS,
  SET_GROUP_MANAGER_TEAMS,
  SET_MANAGERS,
  SET_GROUPS,
  SET_FORM,
  SET_SYNDROMES,
  SET_VIGILANCE_SYNDROMES,
  SET_GO_DATA_TOKEN,
  SET_USERS,
  SET_ADMINS
} from 'constants/action-types';

export const loadMakes = (payload) => ({ type: LOAD_MAKES, payload });

export const setToken = (payload) => ({ type: SET_TOKEN, payload });

export const setEmail = (payload) => ({ type: SET_EMAIL, payload });

export const setUser = (payload) => ({ type: SET_USER, payload });

export const setApps = (payload) => ({ type: SET_APPS, payload });

export const setSymptoms = (payload) => ({ type: SET_SYMPTOMS, payload });

export const setContents = (payload) => ({ type: SET_CONTENTS, payload });

export const setRumors = (payload) => ({ type: SET_RUMORS, payload });

export const setCityManagers = (payload) => ({ type: SET_CITY_MANAGERS, payload });

export const setGroupManagers = (payload) => ({ type: SET_GROUP_MANAGERS, payload });

export const setGroupManagerTeams = (payload) => ({ type: SET_GROUP_MANAGER_TEAMS, payload });

export const setManagers = (payload) => ({ type: SET_MANAGERS, payload });

export const setUsers = (payload) => ({ type: SET_USERS, payload });

export const setGroups = (payload) => ({ type: SET_GROUPS, payload });

export const setForm = (payload) => ({ type: SET_FORM, payload });

export const setSyndromes = (payload) => ({ type: SET_SYNDROMES, payload });

export const setVigilanceSyndromes = (payload) => ({ type: SET_VIGILANCE_SYNDROMES, payload });

export const setAdmins = (payload) => ({ type: SET_ADMINS, payload });

export const setGoDataToken = (payload) => ({ type: SET_GO_DATA_TOKEN, payload });