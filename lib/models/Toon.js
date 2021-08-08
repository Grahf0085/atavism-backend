import pool from '../utils/pool.js';

export class Toon {
  
  id;
  name;
  mainJob;
  subJob;
  mainLevel;
  subLevel;
  race;
  face;
  title;
  war;
  mnk;
  thf;
  rdm;
  whm;
  blm;
  smn;
  drg;
  sam;
  nin;
  pld;
  drk;
  bst;
  brd;
  rng;
  rankBastok;
  rankWindy;
  rankSandy;
  fishing;
  woodworking;
  smithing;
  goldsmithing;
  weaving;
  leathercraft;
  bonecraft;
  alchemy;
  cooking;

  constructor (row) {
    this.id = row.charid;
    this.name = row.charname;
    this.mainJob = row.mjob;
    this.subJob = row.sjob;
    this.mainLevel = row.mlvl;
    this.subLevel = row.slvl;
    this.race = row.race;
    this.face = row.face;
    this.title = row.title;
    this.war = row.war;
    this.mnk = row.mnk;
    this.thf = row.thf;
    this.rdm = row.rdm;
    this.whm = row.whm;
    this.blm = row.blm;
    this.smn = row.smn;
    this.drg = row.drg;
    this.sam = row.sam;
    this.nin = row.nin;
    this.pld = row.pld;
    this.drk = row.drk;
    this.bst = row.bst;
    this.brd = row.brd;
    this.rng = row.rng;
    this.rankBastok = row.rank_bastok;
    this.rankWindurst = row.rank_windurst;
    this.rankSandoria = row.rank_sandoria;
    this.fishing = row.guild_fishing;
    this.woodworking = row.guild_woodworking;
    this.smithing = row.guild_smithing;
    this.goldsmithing = row.guild_goldsmithing;
    this.weaving = row.guild_weaving;
    this.leathercraft = row.guild_leathercraft;
    this.bonecraft = row.guild_bonecraft;
    this.alchemy = row.guild_alchemy;
    this.cooking = row.guild_cooking;
  } 

  static async findAll() {

    const conn = await pool.getConnection();

    const rows = await conn.query(`
    SELECT chars.charid, charname, mjob, sjob, mlvl, slvl, face, race
    FROM chars
    INNER JOIN char_stats ON char_stats.charid = chars.charid
    INNER JOIN accounts_sessions ON accounts_sessions.charid = chars.charid
    INNER JOIN char_look ON char_look.charid = chars.charid
    `);
    conn.release();
    return rows.map(row => new Toon(row));
  }

  static async findByName(name) {

    const conn = await pool.getConnection();

    const rows = await conn.query(`
    SELECT chars.charid, charname, mjob, sjob, mlvl, slvl, title, war, mnk, whm, blm, rdm, thf, pld, drk, bst, brd, rng, sam, 
    nin, drg, smn, rank_bastok, rank_windurst, rank_sandoria, guild_fishing, guild_woodworking, guild_smithing, 
    guild_goldsmithing, guild_weaving, guild_leathercraft, guild_bonecraft, guild_alchemy, guild_cooking, race, face
    FROM chars
    INNER JOIN char_stats ON char_stats.charid = chars.charid
    INNER JOIN char_jobs ON char_jobs.charid = chars.charid
    INNER JOIN char_profile ON char_profile.charid = chars.charid
    INNER JOIN char_points ON char_points.charid = chars.charid
    INNER JOIN char_equip ON char_equip.charid = chars.charid
    INNER JOIN char_look ON char_look.charid = chars.charid
    WHERE chars.charname = (?)
    `, [name]);
    conn.release();
    return new Toon(rows[0]);
  }

}
