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
  digging;
  zone;
  online;

  constructor(row) {
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
    this.fishing = row.fishing || 0;
    this.woodworking = row.woodworking || 0;
    this.smithing = row.smithing || 0;
    this.goldsmithing = row.goldsmithing || 0;
    this.weaving = row.weaving || 0;
    this.leathercraft = row.leathercraft || 0;
    this.bonecraft = row.bonecraft || 0;
    this.alchemy = row.alchemy || 0;
    this.cooking = row.cooking || 0;
    this.digging = row.digging || 0;
    this.zone = row.pos_zone;
    this.online = row.online;
  }

  static async findAll() {

    const conn = await pool.getConnection();

    const rows = await conn.query(`
    SELECT chars.charid, charname, mjob, sjob, mlvl, slvl, face, race, pos_zone
    FROM chars
    INNER JOIN char_stats ON char_stats.charid = chars.charid
    INNER JOIN accounts_sessions ON accounts_sessions.charid = chars.charid
    INNER JOIN char_look ON char_look.charid = chars.charid
    `);
    conn.release();
    return rows.map(row => new Toon(row));
  }

  static async findAllNames(name) {

    const conn = await pool.getConnection();

    const rows = await conn.query(`
    SELECT chars.charid, charname, mjob, sjob, mlvl, slvl, face, race, pos_zone
    FROM chars
    INNER JOIN char_stats ON char_stats.charid = chars.charid
    INNER JOIN char_look ON char_look.charid = chars.charid
    WHERE charname
    LIKE (?)
    `, [`%${name}%`]);
    conn.release();
    return rows.map(row => new Toon(row));
  }

  static async findByName(name) {

    const conn = await pool.getConnection();

    const rows = await conn.query(`
    SELECT chars.charid, charname, mjob, sjob, mlvl, slvl, title, war, mnk, whm, blm, rdm, thf, pld, drk, bst, brd, rng, sam, 
    nin, drg, smn, rank_bastok, rank_windurst, rank_sandoria,
    (SELECT value FROM char_skills WHERE skillid = 48 AND char_skills.charid = chars.charid) AS fishing,
    (SELECT value FROM char_skills WHERE skillid = 49 AND char_skills.charid = chars.charid) AS woodworking,
    (SELECT value FROM char_skills WHERE skillid = 50 AND char_skills.charid = chars.charid) AS smithing,
    (SELECT value FROM char_skills WHERE skillid = 51 AND char_skills.charid = chars.charid) AS goldsmithing,
    (SELECT value FROM char_skills WHERE skillid = 52 AND char_skills.charid = chars.charid) AS weaving,
    (SELECT value FROM char_skills WHERE skillid = 53 AND char_skills.charid = chars.charid) AS leathercraft,
    (SELECT value FROM char_skills WHERE skillid = 54 AND char_skills.charid = chars.charid) AS bonecraft,
    (SELECT value FROM char_skills WHERE skillid = 55 AND char_skills.charid = chars.charid) AS alchemy,
    (SELECT value FROM char_skills WHERE skillid = 56 AND char_skills.charid = chars.charid) AS cooking,
    (SELECT value FROM char_skills WHERE skillid = 59 AND char_skills.charid = chars.charid) AS digging,
    race, face, pos_zone,
    IF(accounts_sessions.charid IS NULL, 0, 1) AS \'online\'
    FROM chars
    INNER JOIN char_stats ON char_stats.charid = chars.charid
    INNER JOIN char_jobs ON char_jobs.charid = chars.charid
    INNER JOIN char_profile ON char_profile.charid = chars.charid
    LEFT JOIN char_skills ON char_skills.charid = chars.charid
    INNER JOIN char_look ON char_look.charid = chars.charid
    LEFT JOIN accounts_sessions ON accounts_sessions.charid = chars.charid
    WHERE chars.charname = (?)
    `, [name]);
    conn.release();
    return new Toon(rows[0]);
  }

}
