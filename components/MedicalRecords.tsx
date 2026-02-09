
import React, { useState, useEffect } from 'react';
import { MedicalRecord } from '../types';
import { Stethoscope, Plus, FileText, Calendar, Edit2, Download, CheckCircle, AlertTriangle, X, Save } from 'lucide-react';

// Utility function to escape backticks within a string for template literal compatibility
const escapeBackticksForTemplateLiteral = (text: string) => {
  return text.replace(/`/g, '\\`');
};

const initialRecords: MedicalRecord[] = [
  {
    id: '1',
    title: 'SJRH Medical Fax - Emma Ryan Drug Test',
    source: 'Saint John Regional Hospital (SJRH)',
    dateOfRecord: '2025-01-10', // Date of the MRO Report revision
    ocrText: `--- Emma Ryan Drug Test (Placeholder) ---

[Page 2 of 16]
Medical Review Officer's Report - Confidential
Revised on January 10, 2025 03:25 PM EST
Lab Account: ACCULAB (#6380-3000)
Donor Name: Emma Ryan
Donor ID: 2310499
Reason for Test: Reasonable Suspicion / Cause
Collector Name: Edward C Matthews
... (Full details would be here if provided) ...

--- End of Placeholder ---`,
    status: 'needs_review',
    dateAdded: new Date().toISOString().split('T')[0],
  },
  {
    id: '2',
    title: 'SJRH Medical Records - Craig Schulz Emergency Visit (35 Pages)',
    source: 'Saint John Regional Hospital (SJRH)',
    dateOfRecord: '2025-09-10', // Date of the emergency visit as per document
    // Applying the escapeBackticksForTemplateLiteral function
    ocrText: escapeBackticksForTemplateLiteral(`===============================================================================
OCR EXTRACTION: scan0007.pdf
Processed: 2026-02-01 18:09:14
Total Pages: 35
================================================================================
================================================================================
PAGE 1
================================================================================
2026-01-30 13:56
SJRH HR ROI6487726 77 5068475837
P 34/36
Horizon Health Network
Order Summary By Paticnt - Rclcase of Information Report Filtcr Critcria PPRN; 432086 Visit TD(S): From Datc: 10-Sep-2025 00.00 To Datc: 3 /-Dec-2025 23.59 Facility: Saint John Regional Hlospital (SCHULZ, CRAIG ALLXANDER P Agc: 3Sy Assigncd Loc: SJR-ED-URG-3ZA PPRN VisitID: 432086 184[7309 DOB; 23-Mar-1 990 Scrvice: Emcrgcncy Medicine Emergency Mcdicine Medica rc: 918954306 Sex: Male Attcnding: Logan; Claire Evelyn (NP) ADM Datc: IO-Scp-2025 12;06 DSC Datc: 10-Sep-2025 21;38 Visit Rcason; Laceration Puncturc Rcsp For Pymt; NB WHSCC Numbcr; 1 1-Sep-2025 19.38 Signed Ordcr(s) Source Verbal Signed By Logan, Clairc Evelyn (NP) (Nursc Practitioncr) 001RQQKGL; consult mente) health ED; consult status; tcam at bcdside
Rcquested By; Whitc; Angcln Dawn (HTM Frofcssional) Trintcd from: SJR-NonPutient-McdRec-07 Printed nt: 30-Jan-2026 11.21 Pagc 2 of 4 SI2IWVVSAHDBPOZA-
================================================================================
PAGE 2
================================================================================
2026-01-30 13:55
SJRH HR ROI 6487726 >> 5068475837
P 33/36
Horizon Health Nctwork Ordcr Summary By Patient Relcasc o[ Information Rcport Filtcr Critcria PPRN: 432086 Visic ID(s): From Dutc: 10-Sep-2025 00.00 To Date: 31-Dec-2025 23:59 Facility: Saint John Rcgional Hospital SCHULZ, CRAIG ALEXANDER P Agc: 35y Assigncd Loc: SJR-ED-URG-32A PPRNIisitlD: 432086 18417309 DOB: 23-Mar-|990 Scrvicc: Emergency Medicine / Emergcncy Medicine Mcdicarc: 918954306 Scx; Melc Attcnding; Logan, Cleire Evelyn (NP) ADM Dalc: 10-Sep-2025 12,06 10-Scp-2025 21;38 Visit Rcason: Laceretion Puncturc DSC Datc: Rosp For Dymt: NB WHSCC Number: 10-Sep-2025 17:18 Ncw Order(s) Sourcc Verbel Entered By Decker, Kondra D (Registcred Nurse) For Logan, Clairc Evclyn (NP) (NVurse Practitioner) OOIRQQKGL; consult mental health ED; consult status: team % bedside Stop I0-Scp-2025 18:08 Status Active Signcd: Scp 44 2025 7:J8PM Sturt 10-Sep-2025 10-Sep-2025 ] 8,00 Ncw Ordcr(s) Sourcc Entcred By Logan, Claire Evelyn (NP) (Nurse Practitioner) For Logan; Clairc Evelyn (P) (Nurse Practitioner) OOIRQQKYF; request MRI cervical spine; indications; fall from 300 $ years ag0, never sought medical carc, Expcricneing dizziness an, requested date; IQ-Sep-2025, Routinc; Start 10-Scp-2025 Stop 10-Sep-2025 18:4 1 Status Active 00 IRQQKYQ: DI instruclions {0 nursc; Completion ofan MRI Safcty Questionnaire is mandatory This can be compleled elecironically (MRI Salety Questionnaire) or manually (faxcd/dropped off to CTIMRI desk) Once documentation is complelc, the order will bc protocolled regarding patient preparation and given the next available inpatient booking: Start 10-Sep-2025 Status Activc O0IRQQKYT; rcqucst MRI brain; indicotions: fall from 30f 5 years 4g0, nevcr sought medicel care: Experiencing dizziness 9n, requested dare: [0-Sep-2025, Routine; Start 10-Sep-2025 Stop 10-Sep-2025 18:41 Status Active OOIRQQKYV; Dl instructions (0 nursc; Complction ofan MRI Salery Questionnaire is mandatory; This can be complered electronically (MRI Saloty Qucstionnairo) or manully (foxed/dropped off to CTM/MRI dcsk) Once documentation Is complete; thc order will bc protocolled rcgarding pazient prepuration And given the ncxt availablc inpatient bcoking; Start 10-Sep-2025 Status Activc 10-Sep-2025 |8,08 Discontinued Order(s) Sourcc Verbal Entercd By System, System DO NOT DELETE (Information Services) OOIRQQRGL; consule mental hcolth ED; consult status; tcam at bedsidc Stop 10-Sep-2025 1 8;08 Status Discontinued via Patient Signed: Scp II 2025 7:J8PM Start 10-Scp-2025 Discharge Rcason; Patient discharged 10-Sep-2025 18.08 10-Sep-2025 18;1 [ Completcd Order(s) Sourcc Entercd By Lamont; Rhonda Kelly (Radiology Clerical) OOIRQQKYT; requcst MRI brain; indications: fall from 30f $ years 2g0, never sought medical care Expericncing dizzincss an, requested dale: I0-Scp-2025, Routine: Start I0-Scp-2025 Stop !0-Scp-2023 18}44 Status Completed 10-Sep-2025 1&:1 | Completcd Order(s) Sourcc Entcrcd By Lamont, Rhonda Kclly (Radiology Clcricel) OOIRQQKYF; request MRI cervical spine; indications: fll ffom 304 $ years ag0, never sought medical care Experiencing dizzincss 3n, rcqucsted datc; IO-Scp-2025, Routinc Start 10-Sep-2025 Stop 10-Scp-2o25 18;11 Status Compleled
Requested By: Whitc; Angcla Dawn (HIM Professioual) Printed from; SJR-Non Paticnt-McdRcc-07 Frintcd nt; 30-Jan-2026 11i21 Pngc 1 o5 $ SQ2IWVVSAHDBPOZA-kdefaultz-Prod IRB_ALL_OrdSun ByPalRlalnfo rell | Ordo SumnaryByPalRlslnfor | 53043563
================================================================================
PAGE 3
================================================================================
2026-01-30 13:55
SJRH HR ROI 6487726 77 5068475837
P 32/36
Horizon Health Network Rcsult Summary by Paticnt Visit - DI; Electro Cardiology, Elcctro Ncurology and Interventional Proccdurc From Datc; 10-Sep-2025 00;00 To Datc: 31-Dcc-2025 23.59 Legend of Report Icons
Media Link
Indicatcs that there is an image nssociated with the result notc uddcd by way ofcommcnt or explanation.
Annotution
Rcqucsted By; Whilc; Angcla Dawn (HIM Profcssionsl) Printcd from: SIR-NonPatkent-McdRcc-07 30-Jag-2026 14:l8 Pocc 5 S92IWVSQHDBPOZB-cdeiaullb~Prod RB_ALL_ROI_ResullbyPalleniPart1 rdl | RB_ALL_ROIResulByPallenipt) 53043502
================================================================================
PAGE 4
================================================================================
2026-01-30 13:55
SJrh HR RO 6487726 77 5068475837
P 31/36
Horizon Health Nctwork Rcsult Summary by Paticnt Visit Dl, Clcctro Cardiology, Clcctro Ncurology and Intervcntional Procedure From Datc: 10-Sep-2025 O0.00 To Datc: 31-Dcc-2025 23.;59 PDF Documents Summary (print manually if needed) There are no PDF documents to print:
Requestcd By: Whitc, Angcln Dawn (HIM Profcssionnl) Printcd from: SJR-NonPatient-MedRcc-07 30-Jon-2026 ] 1918 Pagc S9ZIWVSOHDBPOZB-cdefeulp-Prad | RB_ALL_ROI_ResullByPalleniPart1 ,rdl RB_ALL_ROIResullbyPallervipit 53043502
================================================================================
PAGE 5
================================================================================
2026-01-30 13:55
SJRH HR ROi 6487726 77 5068475837
P 30/36
Horizon Health Network
Result Summary by Patient Visit - DI, Electro Cardiology, Electro Neurology and Interventional Proccdure From Date: 10-Sep-2025 00:00 To Datc: 3 1-Dec-2025 23.59 dizziness and intermittent paresthesias to acns Query cauge 0f same?
COMPARISON; CT from December 14 , 2015
FINDINGS ;
of infarction, hemorrhage, or focal mas3 lesion. Gray-white matter No evidence No hydrocephalus _ No evidence Of dlefusion differentiatlon 1s maintained throughoue No evidence 02 sueceptibillty artifact on tho SWAN sequence _ restriction ,
the left maxillary sinus _ Mastoid air cellg and paranasal Mucous retention cyst within sinuses are othorwise clear and well aerated.
wiehin che cervical spine, a8 evidenced There 1s evldence of early degenerative change andplate Irregularity, and mlld osteophytosts There 19 by dlsc deslccation, subtle at C5-6, but this is not asgoclated with any Significant mild posterior digc bulging canal Or foraminal stenosis.
are maintained_ T2 hyperintense fOcus within Tl Vertebral body heights and allgnment a gmall osseous hemangioma Marrow glgnal 1s otherwlse likely representing unremarkable , The soft tissue3 of the neck appear unremarkable,
IMPRESSION ;
MR findings to explain thl9 patient S symptomatology. Early degeneratlve No concerning wichin che cervlcal spine, but no significant canal or Eoraminal stenosis , changes
Signed by: Michael Fry, MD, FRCPC
Dictated Date ; 2-Oct-2025 7;29 PM
Transcribed Date; 2-Oct-2025 7;36 PM
Electronically Signed; Final Report
Roqucsled @y: WICC, Angcla Dawn (HTM Professionad) Trintcd (roin; SDR-Non alicnt-McdRcc-07 30-Jan-2026 1l;18 Pngc 3 SO2IWVSQHIDBPOZB~kdefaulla~Prad RB_ALL_ROI_ResullByPallenPan1-ral | RB_ALL_ROIRosulByPalleniPli 53043502
================================================================================
PAGE 6
================================================================================
2026-01-30 13:54
SJRH HR Roi 6487726 >> 5068475837
P 29/36
Horizon Hcalth Network Resule Summary by Paticnt Visit DL, Electro Cardiology Electro Neurology and Interventional Procedure From Datc: 10-Scp-2025 00.00 To Dutc: 3 [-Dec-2025 23.59 PPRN(9): 432086 Visit ID(s): All visits Facility: ALL Filter Critcria: 35y Assigncd Loc; SJR-OPD-DIAG-Diag Imaging SCHULZ, CRAIG ALEXANDIR P Agc: 432086 18454321 DOB: 23-Mar-[990 Service: Diagnostics Diegnostics PPRN NisitID; Mcdicare: 918-954-306 Exp: 05/29 Sex: Malc Attending: Logan, Clairc Evelyn (NP) ADM Dutc: 25-Sep-2025 21:25 DSC Date: 25-Scp-2025 23.59 Rcsp For Pymt: NB Medicarc Numbcr: 918-954-306
Diagnostic Imaging
are malntalned T2 hyperintense Eocug within T1 Vertebral body helghts and alignment a small osseoug hemangloma= Marrow signal i9 otherwlse llkely representing unremarkable. The goft tissues of the neck appear unremarkable
IMPRESSION:
No concerning MR findings to explain this patlent 5 symptomatology, Early degenerative tha cervical spine, but no significant canal or Eoramlnal scenosis. changes within
Signed by: Michael Fry , MD, FRCPC
Dictated Date : 2-Oct-2025 7;29 PM
Transcribed Date; 2-Oec-2025 7.36 PM
Electronically Signed: Final Report
Entcrcd On: 25-Sep-2025 21:32 Order; MRI ccrvical spine Ordcr ID: 001RRTPXP Ancillary ID: 2009498560 Rcsults Postcd t0 SCM: 02-Oct-2025 19.41 MRI cervical spinc
Performed Dato: 25-Scp-2025 21.32 1 or morc Rcsults Rcccivcd
Final
2009498560
001RRTPXP
MRI Cervical Spine "S
25-Sep-2025
2009498559
0O1RRTPXM
MRI Head -k
25-Sep-2025
INDICATION: Fall from 30 feet 5 years ag0. Never sought medical care, Experiencing Rcqucstcd By: Whitc, Angcla Dawn (HIM Professional) Printed from: SIR-NonPaticnt-McdRec-07 30-Jnn-2026 14:18 Page 2 SOZIWVSOHDBPOZB_
================================================================================
PAGE 7
================================================================================
2026-01-30 13:54
SJRH HR ROI 6487726 >> 5068475837
P 28/36
Horizon Health Network Result Summary by Paticnt Visit - DI; Electro Cardiolgy, Electro Neurology gnd Interventional Proccdure From Datc: 10-Sep-2025 00;00 To Datc: 31-Dcc-2025 23.59 PPRN(s): 432086 Visit ID(s): AJl visits Facility: ALL Fillcr Critcrin: 3Sy Assigncd Loc: SJR-OPD-DIAG-Diag Imaging SCHULZ, CRAIC ALEXANDER P Agc: 432086 18454321 DOB; 23-Mer-| 990 Service: Dingnostics / Diagnoslics PPRNNVisi ID: 918-954-306 Exp; 05/29 Scx; Malc Attending: Logan, Claire Evclyn (NP) Medicarg: ADM Dale: 25-Scp-2025 21,25 DSC Datc: 25-Sep-2025 23;59 Rcsp Foc Pymt: ND Medicare Numbcr; 918-954-306
Diagnostic Imaging Entcrcd On; 25.Scp-2025 21:32 Ordcr: MRI hcad Ordcr ID; OOIRRTPXM Ancillary ID: 2009498559 Rcsults Postcd (o SCM; 02-Oct-2025 19341 MRI head
Performcd Dutc: 25-Scp-2025 2 | ;32 or morc Results Rcccivcd
Final
2009498560
OO1RRTPXP
MRI Cervical Spine -5
25-Sep-2025
2009498559
0O1RRTPXM
MRI Kead -H
25-Sep-2025
5 8g0 . Never sought medical care . Experiencing INDICATION: Fall from 30 feet years and intermittent paresthesias to acms Query cause O2 same? dlzziness
COMPARISON : CT from December 14, 2015
FINDINGS:
No evidence of infarction, hemorrhage , or Eocal magg legion. Gray-White matter No hydrocephalus _ No evidence of dlfEuslon differentiation is maintained throughout rebtriction No avidence Of 9uaceptibility arcifact On che SWAN sequence _
within the loft maxillary sinus, Mastoid air cells and paranagal Mucous rotention cyst sinuses are Otherwise clear and well aerated,
1s evidence of degenerative change Within the,cervical epine' as evldenced There 8ublYe desiccation, endplate Irregularity, and mild osteophytosis _ There is by disc mild poaterlor disc bulging at Cs-6, but this 15 not associated with any significant canal Or foraminal stenosis
Rcqucstcd By: White, Angcla Dawn (MIM Professional) Printcd from; SUR NonPaticnt-McdRcc-07 Puge S92IWVSQHDBPO2B-cclefeulb-Prodl | RB_ALL_ROL_ResuliByPaleniPartI rdl | RB_ALL_ROIResullbyPalleniPil | 53043502
================================================================================
PAGE 8
================================================================================
2026-01-30 13:49
SJRH HR ROI 6487726 >> 5068475837
P 17/36
bid0a4 PI BaNTI Horizon Hualym Nabwoni
SCHULZ, CRAIG ALEXANDER P SJr-ED-URG-JZA 432086 DoB: 23-Mbr-1990 35y Male Rabp:NB WHSCC Logan; AD: 10-Sop-2025 12.08 Clalra Evelvn (NP) ATT emeRiemeR OBrlen; Chrlstaphor P Prlmdry: 508 8502122 Lang: Engllgh
The Broset Violence Checklist (BVCO)
Monday Date Tlmo / Inlelals Confused Inllable Voiierveats Phyelcal threats Allacklng oblects SUM Inkerventions
Evenlng
Nlght
Tuesday Dale Tlme | Inldals Confused Irdtable Boierorents Physlcal Ihreals Altacklng oblects SUM Inlewvenllong
Day
Evenlna
Nlght
Day Y 3 9
Wednesday Dale Time Ioltials Confused Irrilable Boisterous Verbal Ihreals Physical threats Altacklng oblects SUm Inlervenllons
Day
Evening
NIght
Thursday Dato Tlmo Inltfala Confused Imllable Bolsterous Verbal Ihreats Physlcal threals_ AltackJecls SUM Intewvenlions
Day
Evenlng {
Night
Fulday Date Tlme / Inltlals Conlused Irdltable Boisterous Verbal threats Pbyslcal threals Altacking oblects SUM Interventions
Day
Evenlng
Night
Saturday Date Time / Inltlals Confused Imitable Bolsterous Vorbal Chroats Physlcal (hroats Altacking_Oblects SUM Untewventons
Day
Evoning
Nlght
Sunday Dato Tlme | Inllals Confused Imitable Bolslerous Verbal threats Physical threals Altacking oblects Sum Inlenventlong HHN-O923 (10r23)
Evoning
Nlghe
Interventions 2 No Intrvonllon 8 Verbal Deegcalelbn 2 = Dvaralnal ecllvlly 3 = I Slmulallan 5 Sengary Modulallon 5 = Madicallon 6 = Conblanl Obsorvallon = Secivelon 8 = Reetrelnt
Slgnaturo
Inlllalb Tn&aleuzz 49
Paga 1 of2
Day
================================================================================
PAGE 19
================================================================================
2026-01-30 13:49
SJRH HR RO[ 6487726 77 5068475837
P 16/36
bgdIau DI DantI Horzon HanthNitwaar
ALEXANDER P SCHULZ, _ 'CRAIG Molo Sjr-Ed-urg-32A 3y Dob; 23-Mof-1990 10-Sop-2025 12,00 432086 ADM: emeriemer AosP;NB WHSCC Rogpn; Ciairo Evelyn (NP) ATT Long; Englsh OBrlen, Christophor E 506 8502122 Palmnry: =
Mental Status Examination (MSE) Addiction and Mental Health
Complele 48 pen o/ Inteke eesdaument and once per ohlf ar earller 08 Indlealod Select all that apply And epeclly detalla &8 needed Document Inlorvonllong In hoallh rocard (0.@, PRNs, adveree evente, changee In mMontal stolus &r lavel of obgervbtlon) Noilly AP If noodod Appearanee Approprlate Inappropriate Looks staled age O Yes ONo, Younger Older Grooming Hygiene Malodorous Neal D Overly mellculous Unbathed Dress Approprlate to sltualion Clean D Dlsheveled Inepproprlate to sltuallen Solled O Stalned Posture Comfortablelrelaxed Rigld D Slouched O Slumped O Stoopad 0 Threatening Eye contact Attenilve DAvoldant Fleetlng Starng Pupils Constricted Dllatod Equal &nd Reaclive Motor Activityl Approprlate 0 Catatonlc O Compulslve behavloura 0 Hyperarousal D Impulslve Behaviour Psychomotor agllallon O Psychomotor Impalrment Rlgldlty D Unusual movements Aggresalve OApathelle O Apprehenslve D Cooperailve D Dolenslve Attitudo during 2Approprlate_0 Angr Guarded D Imltable 0 Peranold 0 Resisllve 0 Seductlve D Susplclous O Uncooperatlve Interactlon Withdrawn D Aphaslc D Echolalla Incoherent Loud 0 Mumbllng D Pauclty Prassured Speech Approprlate Rapld D Solecilve mullsm 0 sor Q8low to respond D Slured O Stuttering Pallent's reported mood: Non-Verbel Mood Affect (quality, Appropriate 0 Blunted Constrleled D Expanslve 0 Flat D Lablle O.Tearful range; Intonsity) Afecl congruent t0 content Q YesDNo Aftect congruent to mood Q Y9s2No _ 0 Clrcumslantlal D Clang assocletlong O Cohoront D Concreta D Confabulatlon Thought process Q Appropriate Fiight of Ideas 0 Goal dlrected Q Illogleal D Incoherent O Loglcal D Laose assoclallons 8Necogilide 0 Pereveratlan O Tangentlal D Thought blocklng 0 Word salad QApproprlate 0 Depresslve D Homleldal Ideation 0 Ideas of raference 0 Inflated selkworth Thought content 0 Intruslve thoughts Q Maglcal {hinklng D Negallve thlnking Obsesslons D Paranoid Ideallon Q Poveny pf conlent O Phoblas D Prooccupallon 0 Ruminallons D Self-deprecallon Sulcldal Ideallon D Thought broadcastlng D Thought Insertion O Thought withdrawel Delusions None 0 Controi 0 Erolomanla D Grandlobe DNihllisilc Paranoid Perseculion Rellglous 0 Somallc None Hallucinatlons: 0 Audllory Command Gustatory O Olfactory 0 Tacllle Visual Pereeptual Dlsturbancos O Body Imagelelght dlstortlon D Depereonallzalion Dereellzallon Illuslons Sensorium and Alerness: 0 Alen D Drowsy O Lolharglc Stuporous Cognltlon Orlenfatlon; D Person O Place 0 Mme O Dlsorlented, spocily: Concentrallon; Able to {ocue / susteln attentlon D Yes_CNo Memoc Impalrment: Shont termDYes 0No Procedural D Yos No Insight Inslght Into: Illness D Yes 0 No D Parlal Plan of Care Yos ONo 0 Pertlal Impulse Control Good 0 Intect Impalred Poor Judgement Congruent {0 altuetlon 0 Impalred Current Risks None Dellrlum D Flra hezard O Harassment (0 olhers 0 Medlcallon non-acherence Reckless bohavlour O Self-Inlurlous behavlour Q Sexuel behavloure 0 Subslance Use Suieidalitylplan O Violent ideationlaggresslon D Wanderlng/Unaulhorized leave of absence Olher , Comments
Slgnature HHN-1613 (08/25)
Date (monthtddNyYY) _
L'_Timo
Page 2 of 2
================================================================================
PAGE 20
================================================================================
2026-01-30 13:49
SJRH HR ROI 6487726 77 5068475837
P 15/36
NgIcau DI Dan?i Horizon KtalthNttwonr
'SCHULZ, CRAIG ALEXANDER P SJR-ED-uRG-324 432086 DOB: 23-Mar-1890 35y Malo ResPNB WHSCC ADM; 10-Sop-2025 12.06 Logan; Clalre Evelyn (NP) ATT eMeRIeMER OBrlen, Chrlatophar P Prlmory: 506 6502122 Long: Engllsh
Mental Status Examination (MSE) Addiction and Mental Health
Completa 08 part o/ Inteka eebebement &nd onca per ehlft or earller 09 Indicafed Soleei all (hal apply end apeclfy detalls 08 neadod Document Inlarvanllans In hoailh rocord (0.g. PRNo; edverae events, chenges In monlel elalue ar level 0/ observatln) Nollly AP If needed Appoaranco Zpproprle@O Inapproprlate Lpoke stated age YeeQ No Q Younger Older Grooming Hygiene Malodorous Neat Overly metlculous Unbathed Dross QUAppropac @ TIVaIO_MECI@a4 Q Dlsheveled D Inappropriate to situalion Solled Stalned Posture D comforablelrelexed Rilgld O Slouched Oslumped 0 Stooped 0 Threatening Eye contact Attentlve . Avoldant 6 Fleeting QSlarlng Pupils Constricted Dllated ~ee eltndReedlme Motor Activityl Aprorrale Cetetonlc 0 Compulslve behavlours Hyperarousal O Impulslvo Behaviour Psychomotor agllation QPsychomotor Impalrment D Rlgldlty O Unusual movements Attitude during QApproprlate @ Angry QAggresslve D Apathetlc QApprehenslve O Cooperallve 0 Defenslve interaction Guarded Q Irrltablo @paranob> 0 Reslstlva 0 Seductlve 0 Susplclous D Uncooperalive Wivhdrawn Hrs SomLo4L fALLAVita hischec} Spooch Appropdbl Q Aphable D Echolalle Q Incoherent 0Loud 0 Mumbllng O Pauclty Pressured D RRapid Seleclive mutlsm DSof DSlow to respond 0 Siurred O Stutterlng Mood Pallent's reponted mpod: Pacqnqie) Non-Verbal Affect (quality: XAPproprlale Q Blunted 0 Conatrlctad Expanelve 0 Flat 0 Lablle O Toarful range; intenslty) Afect congruent to conten Qye}0 No Afecl congruent t0 mood [INOS"' No Thought process (pproprlate Clrcumstanllal O Clang assoclatlons 0 Coherent D Concrete Confabulatlon 0 Fiight of Ideas Goal diracted 0 Illoglcal O Incohorent O loglcal OLoose essoclatlons Neologlams O Peroveratlon DTngontiel Dthoughl blocklng D Word ealad Thought content JApproprlale Q Depresslve D Homlcldal Idoation O Ideas af reference D Inlated s0lf-worh Intrualve thoughta Q Maglcal thlnking D Negallve (hlnking O Obsesslons Paranoid Ideatlon Poverty of content O Pheblas D Preoccupallon 0 Ruminallons Q Self-deprecation Sulcldal Ideatlon Q Thought broadcesting Thought Ingedlon 2Thoughl wlthdrawal Delusions ONOBO Contral D Erotomanla D Grandiosa D Nlhlllstlc 0 Paranoid Perseculion Roliglous D Somatlc Porceptual None Halluclnallons: D Audltary O Cammand D Gustatory Olfactor Tacllle Vsual Disturbances DBody Imegelwelght dlstortlon D Depersonalization Derealization 0 Illublons Sensorlum and Alerness; @A1BIZ@ Drali Lethargle Q8tuporous Cognition Orlentallon: Pergon aridde Tme>O Dlsorlanled; speclly; Concentrallon; Able t0 {ocus sustaln attentlon N0s No Memory Impelrment; Short term D Yes JID Procedural Yos No Inslght Inslght Into: Illness Yes No Partlel Plen of Care 0 Yes 0 No 0 Penlal Impulso Control Gaod Inlact Q Impelred Poor Judgement A Congruent to sltuallon Impalred Current Risks ANone D Dellrlum O Flra hezerd D Herarsment (0 Olhers 0 Medicallon non-acherence QReckless behavlour O Self-Inlurlous behavlour 0 Sexual behavlours 0 Substanca u80 Sulcldelltylplan D Volent Ideatlonlaggresslon D Wanderlng/Unauthorlzed leeve of ebsence 0 Olher Comments
Slgnature HHN-1513 (06/25)
Dato (monthlddlyyyy)
Timo Jroq Pega 1 0{2
574418 b ~
================================================================================
PAGE 21
================================================================================
2026-01-30 13:48
SJRH HR ROI 6487726 77 5068475837
P 14/36
aiblau D} IantI Horizon bialtw Intake Emergency and Inpatient ChildNouthlAdult Addiction and Mental Health
SCHULZ, CRAIG ALEXANDER P 8JR-ED-URG-J2A 432086 DOB; 23-Mar-1990 35v Mola RobP;NB WHSCC ADM: 10-S0p-2025 12.06 Lagan; Clalra Evelyn (NP)ATT emeriemer O'rien, Chrlslopher P Prlmary: 506 8502122 Lang: Englilsh
Additional Documentatlon Roqulred wlth intake; Vital slgns asgessment (u8e graphlc sheet)" Actual Welght (Kg) and Height (om) (use graphic sheet) Broset Violence Checklist HHN-0923
Conflrm or Complete intake components If not done and include In patients health record including: Mental Status Examination (MSE) HHN-1513 C-SSRS Quick Screener (HHN-1271) and if positive, continue with C-SSRS LifetimelRecent wilh Risk and Protecllve Factors (HHN-1272) Interventiong for safe envlronment and managemant of sulclde rlsk Includlng reductlon of access to lethal means Sulalde Safety Plan (Adult HHN-1085 English/1097 French; (ChlldNouth; HHN-1088 English/1098 French) Educatlon to Patlen FamllyIDSP (Adult Gulde HHN-1088; Helplng'ChlldNouth Gulde HHN-1087)
Addlllonal documentatlon a8 per patlent care needs, interventions, program, and care area specific requlrements Copies of regulred forms Included In (he health rcord With Part B
Admission Focus Note if applicable Includlng (but not Ilmlted t0}: Safety risks for sulclde, aggresslon; and slgnificant findings Including safe environment; safety interventions and treatments in progress, patient centred concers; required consults,; and communication (as applicablelifnot found elsewhere in patients health record) Best Pogsible Medlcatlon Hlstory (BPMH) and Medlcatlon Reconciliation Braden Pressure Ulcer Risk Assessment (HHN-0oz7)/for 0-17 years HHN-0385 Conslder consult t0 Cllnlcal Nutrition When Braden score is equal or less than 14 andlor Braden nutrition subcomponent score is 2 or below: Horizon Presgure Ulcer Rlsk Assessment and Preventlon pollcy HHN-CL-NUOO2 Fall Rlsk Assessment (HHN-O044)Humpty Dumpty Scale for 0-17 years (HHN-0064) Including giving Horizon Fall Preventlon pamphlet HHN-OO82IChlldMouth HHN-0114 to patient / careglver Care Plan HHN-1144 initiated and slgned wlthln 24 houra of admlsslon Comfort Plan HHN-0980 a8 appllcable Slgnature Dato (nonthlddlyyyy) Tlme IAda (lbo 544+.0,2025 18c2o
HHN-0938 (07/25)
Page 0 of 6
================================================================================
PAGE 22
================================================================================
2026-01-30 13:48
SJRH HR ROI 6487726 77 5068475837 P 13/36 SCHULZ, CRAIG ALEXANDERP aldiau 01 Oantu Horizon Spoed-URG-ADOB: 2>-Mar1980 35y Malo 432080 ADM; 10-s0p-2025 12.08 RasP NB WHSCC Emergency and Inpatient emeriemer Intake Logan; Clairo Evolyn (NP) ATT ChildNouthlAdult O'Brlan; Chrlalaphor P Lona; Enallsh Addiction and Mental Health Prlmory: 508 0502122 NIA = Nol_ Applicable UTO = Unable to obtain information See notes Legend Blaylock Discharge Planning Risk Assessment Screen (BRASS) Check all that aply: total for score: Refer to the Risk factor Index Age: Behavlour Patterns (celect all that apply) 0o Appropriato 0 55 years Qr les8 56-84 years 82 Agidering 1 1 65-79 years 03 Confused 1 B0+vears Othor 1 Living Situationlsocial support: Lives only wilh spouse 00 Mobility 01 Ambuiarory 0 Llves wlth famlly 02 Ambulatory wlth mechanlcal asslstance (walkerlcano) 1 1 Llves alone wlth famlly support LIves alone wllh frlends' guppart 03 Ambulatory wllh human asslstance 2 04 Non-Ambuletory 3 Lives alona wllh no suppont Nurglng homelregldentlal care D5 Sonsory Donclts 'Functlonal Status Nioial or hearing deficlts 82 Idependent (Or aDLs Visual and hearlng deflclts 2 Depondent in (solecr all that apply) D Number f Prevlous Admlsslon Emergency Room Vislts Eatlng/Feedlng D2 None In last 2 months 0 Bathlng/Groomlng 0 One in last 3 months 1 Tolletlng 1 D Two In last 3 months 2 Transfering D1 More Ihan two In last 3 months 3 Incontlnent of bowel functlon Incontlnent of bladder funcllon 0 Number of Actlve MMedleal Probleme' Meal preparatlon Thro medical problems 0 Responslble for own medicetion admlnlstration Three t ilva medlcal problems 8 Handiing own Inances More than Ilve medlcelproblems 2 Grocary shopplng Number o[Drugs Transporallon Fower (han {hro@ drugs 88 Cognltlon Three (0 IIve drugs More than ilvo dnugs 02 Orlentated Dleorientated t0 some sphores (person, place; Total score (sum of all selected Items) Ime, gel)) soma of Ihe time Rlsk Factor Index Score Disorientatod (0 some spheres all of (he time 02 0-9 = not at rlsk for home care resources DIsorlentated t0 all Spheres soma @f tho tIma D3 10 = af rlsk for homo care rosqurces DIsorlentated t0 all Spheres all 0f the llma 04 11-19 = at rlsk for extended dlscharge plannlng Comatose D5 Greator than 20 = at rlsk for placemant other Ihan home ~Permlsslon recelved from Ann Blaylock for us0 NOTE If the score Is 10 or greater; refer t0 dlscharge plannlng Copyright 1991 coorlnatorlteem Uto NIA Discharge Conslderatlons - Anticipated dificulties at dlscharge? Yes 6No If y0s; nollfy soclal worker to Inlliate dlscharge planning Dlgcharge destnatlon (If known) Exlstlng supports In place Q Yes No If yes, speclty Homemaker hours per-week ORegular help from Othar sources (epeclfy) Communlty soclal workerladdictlon and mental health worker; speclly Extra Mural Program (EMP) servlces_speclly Signature Date_lmonthlddlyyyy) Time DuLa Sset 40702.S HSOO Uad HHN-0936 (07/25) Pege 5 0f 6
================================================================================
PAGE 23
================================================================================
2026-01-30 13:47
SJRH HR ROI 6487726 77 5068475837
P 12/36
Igttav DI Janti Horizon Hitaitii Nctwonr
SCHULZ, CRAIG ALEXANDER P SJr-ED-URG-32A 432086 DOB; 23-Mer-1990 35y Malo ReaP;NB WHSCC ADM: 10-5op-2025 12,06 Logan; Clalre Evelyn (NP) ATT emeriemer OErlon; Chrlslophor P Prlmdry: 506 0502122 Long; English
Intake Emergency and Inpatient ChildNouthlAdult Addiction and Mental Health
Legend NIA = Not Appllcable UTO = Unable t0 obtaln Informatlon See notes Part B: Admission Complate Part B for all patlonts admittod (review Part A as needed} Add delalls and slgn where applicable wllhin 24 hours of admlssion, Systems Assessmeni (signidcant (ndings; pas) mnedlcatnisary See PurA Hstory) (WDL) # Wllhln Defned Llmlts Neurological WDL F Aler; orlenled; move followe commande no dizzlneao;headache' Or mnemor lo8u0 4 WDL Burnlng Numbness Tingling Dizziness D Headaches Irritability Memory loss (Recent or Long Term) Tremors Head Injury Follows simple commiands O sieady balance Moves all Illmbslcoordinated Cardiovascular WDL ='no edema; togular puleg waimidri"no Cardiao Paln or Gyanosls or relaled eymptomo WDL Edema 0 Yes No Skin Warm Dry OPale Hovfiushed CoolciammyiMotled Dlaphoretic Cyanosis Cardiac Releted Symptoms _ Yes No Detalls_ Rospiratory WDL : Broalhlni qull roqulat no Occoaior mubela Uso; upulum Obbent Cionr; whilc, or no cough %r Dpnee_ WDL No Difficulty Shortness of breath (S0B) Wheeze D Cough 0 Sputum Eyes, Ears;'Nose' and Throat (EEND)WDL " No oboorved vlaual; hoaring or eweilowing_dllicullles no reporte oL evmplome WDL EENT concerns Hearing Vislon Nasal Swallowlng GastrolntestinalliGenitourinaryiReproductive WDL' Roguler bowel peltem; dot toloratodiconlinununo concerna WDL Bowel Issue Q Yes D No lf yes, descrlbe Bladder Concerns Yos No f yes, dascribe Nausealvomiting 0 Yes No if yes, describe Chewing difficully Yes No If yes; descrlbe Nutritlon Considerations' (Two' 'Yos' hlgh nutlilon tiek: Conalder Clnicel Nutrlllon' oav0s9menf) WDL Diet at home 0 Regular Q Diabetic Other Have you lost weight in past 6 months without trying? D Yes DNo (loss gained back is 'no") Have you been eatlng'loss than usual for more than @ week? Yes 0 No Integumentaryi MusculoskeletalWDL' 2 Skln Wan;" dry no Concemilgoodtande oimollor WDL Skln Infact Rash Lesion Brulse Scar D Jaundice 0Other Intravenous Sile (V) D Yes O No (if yes, %ee Part A: Current Substance Use) Ulcer.0 Yes 0No Alds Utlllzed at Homo UTO NIA Patient utillzes alds at home Yas: No Ilyes, Indlcate Mpe and If present wllh Pallent . on admisslon Hearlngald 0 Left Right ) Oyes No Dentures Q Upper Lower Partlal Yes No CPAP BIpAP" "NOTE Iiwith patient on admlsslon notify Englneerlng for check Yes No Eyeglasses Contact lenses QArtificial eyes 0Left Q Right Yes No Artificial limbs, speciy Breceg_speclly Yes No Crutches DWalkerlrollator Wheelchalr 0Cane Other; speclly Yes QNo Signaturet : Date (month/ddlyyyy) Time Olal . SeqtJ0Zoz5 JROo HHN-0830 (07125) Pago & 0/ 6
================================================================================
PAGE 24
================================================================================
2026-01-30 13:47
SJRH HR ROI 6487726 77 5068475837
P 11/36
nOdgAU QI Janpu SCHULZ; CRAIG ALEXANDER P Horizon NEaLTM Srobd-urd-SDOB: 22-Mer-1980 432086 35y Malo RogPiNB WHSCC ADM: 10-80p-2025 12.06 Intake Emergeney and Inpatient Claire Evelyn (NP) ATT emea/eMer ChildNouthlAdult Logan; OBrien , Christophar P Addiction and Mental Health Prlniarv: 506 6502122 Long; Engligh Legend NIA = Not Appllcabla UTO = Unable t0 obtaln Informaiion See notes Cuwont Substanco Uz0' UTQ NIA Substance Type Amount FrequeneyIRoute How Long Date Last Taken OL7 D Alcohol @4+l acayinpoe Mscbeagdailysliakiz AranisadLiok Benzodiazeplnes Stimulants Lecaias_tLi-fe8Lait ~Lykg Oploids Prescription Other Comments;
Gambling Sereening UTO Have you ever taken part in gambling activilles? DSYev Q No If yes; ask these questlons When was the last (ime? Wore thant o qEvs Within 30 days (how many 1-2 3-14 015-24 25+) How long have you been gambling? O Less than a month 1-3 months 03-6 months 07ongontan Emmonwhe Does your gambling Gause problems with familya relationshlps, finances, vocatlon, educallon? AYess 0 No, Ifyes, specify Dxil g44blia 4L49 Risk of Harm Zygretso)Ecreening UTo Do you have (houghts of homicide or harming another person? Yes NoJvyes, descrlba
Have you had these (houghts In the pagt (month;, 6 month8; year)? Yes
No yes, describe
Interventilons Implamented to reduce, prevent known triggers of violence and aggression Yes NOf yes, speclly
Risk of Harm Sulclde Screening LAssessment' UTO Complete Columbia-Guiaide Severity Rating Scale C-SSRS) (HHN 1271 0os No, and If yes (posilive) , complete CSSRS Lifetime/Recent with Rlsk and Protective Factors (HHN-1272) and document Interventions for sale environment and management ol sulcide risk_and reductlon of access (O lethalmeang_In theheallh record Formulatonipispositioniplan: 0Admittod to hospital O Communlty Follow up Arranged" Back t0 ED Summary: CmHc (AutaLR Suabellid 4 es-uhioks-GeaS AE_Waillis} @62_ Suypoadladhed RRavie d Complete Transfer 0f Information HHN-0940 If not belng admllted" Warm Handoff with next care provider_ Part @ is completed upon patient admission (within 24 hours) Complete requlred documentatlon Keep pages together Bignature: Dato (monthddlyyyy) Timo lixdz "Okohi Ept1e.zuzs 18o HhN-0936 (07/25) Page 3 0f 0
================================================================================
PAGE 25
================================================================================
2026-01-30 13:47
SJRH HR ROI 6487726 77 5068475837
P 10/36
p(atav DI JaNTI Horlzon NOALIM Nitwonk
SCHUlz, CRAIG ALEXANDER P SJr-Eb-urG-J24 Male 35y DoB: 23-Mer:1890 432086 ADM: 10-S0p-2025 12,06 Intake Emergency and Inpatient ResP;NB WHSCC Emeriemer ChildNouthlAdult Lugan; Clalra Evelyn (NP) ATT OBrion; Chilalophar P Long; English Addiction and Mental Health Pelmary; 506 6502122 Logond NIA = Not Applicable UTO = Unable 10 Olizirt Ilurmation See notes Initial Pain Assessmenf' UTO Do you have Paln? Yas @N Acute Chronic Describe P= Provoking/Precipltatlng Factors MovemenVactivily Inactivity Other, Q = Quallty Q Crushing Dull Heavviness D Shooting O Achlng 0 Squeezlng 0 Throbblng Burning R= Rogion/Radiation location Radlalos to S = Severltylsymptoms (Scele 0-10 rate pain Ozno paln; 10zworse pbln ever) ak resk _ I1o with ackivitylcough 110 T = Timing O Occaslonal 0 Intermlitent Constant U= Understandlng What helps relleve the paln Infection Prevention and Control UQ: Collec admleslon screenlg_epoclnens [0, MRSA_VRE CPEend C_euds 1 "Have you bean admllled t0 @ hospitalwithin the past yearz" Yes 0 No 2. "Have you been admlltedto @ hosplal outslde 0r Canada (including the US) within the past year?"_ Yes D-No 3 'Are you belng admllted from @ long-term Care (acility_rehabilitation or Correctionalfacllly?" 0Yes Q:No 4. "Have you previously been colonized Or inrected WhMRSA, VRE or CPE?" Yes O-No 5 "Have you had close contact Wih anyone (e.g: a family member; oporis (eammate (@ic ) who has Yes ANlo been diagnosed with MRSA_CPE VREZ 6 "Have You_been On hemodialysis in Ihe past year?" Yes No 7 "Have You used recreational drugs (excluding marijuana) in the past year? Yes No 8 "Have You resldod In @ country putside g Canada in the past year (greater than e months)?" Yes Dilo 9 Ara you currently residing in @ temporary living arrangement Buch a8 & gheller orIn ghared Crowded Yes No condllions @cu dormitom_militery_berracks If any "Yes onswars 0r DnV doubtabou prodonch o7rIsK_Obtain Owabslepeclmens @S perSunvelllance SwebAdmiesion DIR-IPC 40085 Immunizatlon Status: Number Oi doses Date of Last dose Covd L 19 vaccine Yes No UTO ~S Iniuenza vaccine Yes No UtQ Pneumococcal vacclne Yes No UTQ Smoking Cessatlon Uto Have you used any form of tobacco or vaped nlcotlne In the paet 6 months? DYes No If yes, Advlse 0f Smoko-Free Environment policy HHN-GA-009, complete smoklng/vaplng cessatlon consult form HHN-O040 and obtain Stop Smoking Medlcallon (SSM)as regulred Nlcotine Withdrawal COS PPO-RT 40016 Substance Use:' ri UTO Kebstinence_psychosls_selzure; Edmieelonatleamed umpact ontarionshlpe imanceg @mployment_educalom) 1 "Haveyou ever felt thatYou should cut down on your drinking?" DYes '4a iaat: O.No 2, "Have people annoyed you by crlllclzing your drinking?" Yos No 3, "Have you evar fell bad or guilty aboufyour drinking2" Res No 4 "Have you ever had & drlnk first thing in {he morning to steady your nerves or t0 g0t rld of& Yes D-No hangover_ (eye opener)?" 5 "Have Yo4 had alcohol In the past 72 hours?" Yos DNo NOTE Initiate CIWA-Ar Alcohol Withdrawal Assessment HHN-1066 If ? or more "Yes" responses on the CAGE questions with alcohol uso wlthln tho last 72 hourz _ Taking substances or non-prescriptlon medlcallens Yos No yes, specify In Current Substance Use secllon Injecting Substances Intravenously D Yes Nop NIA Intravenous Slle(s)_ Dressing_ required Yes No If yes specify Slignature Date (month/ddlyyyY) Timo Q6 Sep+la,2ozs I8oD HHN-Q0J0 (07/25) Page 2 0f 0
================================================================================
PAGE 26
================================================================================
2026-01-30 13:56
SJRH HR RO[ 6487726 >> 5068475837 P 9/36 SCHULZ, CRAIG ALEXANDER P aLidav DI IARYI Horizon SJr-ed-URG-324 Do8: 23-Mar+1990 35v Molu MIaLFM Nitwquk 432086 ADm: 10-Sop-2025 12,08 Intake Emergency and Inpatient Ro99r,CianhSvolyn (NP) ATT emeriemer Logan, ChildNouthlAdult OBrien, Chrislophor P Long; Engllsh Addiction and Mental Health Prlmery: 506 6502122 Legend NIA = Not Applicable UTO = Unable t0 obtaln Informallon = Sae notes Part A Patient contact numberS06 6562122 Patlant gecondary contact number Communlty Clinician Heallh Care Provlder_Ar_Qkatn Inpallent Identification band applied as per PatientClient Identificatlon HHN-SA-027 6Yes ONIA Allergies/Reactions revlewed and documented Yes DUtO Allergy Band applied 0 Yos NIA Enolish French 0 Other _ Interpreter required Q Yes 0No Preferred language DlstIngulshlng Characteristics: Halr hcewn Eye Colorblye Tattoos/Plerclng Birthmark8 Exlsting medlcal; securlty; andlor Other alerts Q Yex(ONoIf yes, specily Mental Heallh Act DNIA @valutar O Involuntary_ Known Safety Concerns 0 Yes NO Unknown If yes, specily Valuables Date of Last Bowel Movement _ 54 9,2083 Dale of Last Menstrual Period NIA Pregnant 0 Yes ON ONIA Estimated date of delivery Sexually Transmitted Infection 0 Yes 0 No Data of Last PAP exam NIA Dale of Last Prostale exam NIA Ostomy QYes DNo Date of last device change_ Type/size Urinary device O Yes 0 No Dale devlse Insertad Type/size Hlstory Of Llver Disease Q Yes D No When Hepatltls 0 Pancreatitis Cirrhosis History of Selzures QYas No When NIA Reporled concerns wlth sleep O Yes O No If yes; specify Recent losseslchange In Ilfe clrcumstances Q Yes No Ifyes specify PeychlatrlclPsychosocial History (Gpeci/ensetsituallon tistor: Uto Tapsphar;t5d)^ Ovo/ 0 47, 48d6 dr FS - 1601 0lj 9uTS,47Huoedo 15887 40 Joart; 4 Mel, 04i Iyr SiL bvias A 'ciks h ho Ibts 0f CutrinF Gyhi Stoseats 47icy # Pafana a-taf aeshs mailm4 1) hove S9 Aone i4 haollhoca4 {cad Ks <6ot+s. Pojsi 6le 4 dhd Education Employment_6 @@fer Serannalon )) Mental Status " UTO Complete Montal Stalus Examinallon (MSE) Form (HHN-1513) Communication Consideratlons: VTO Visual Impalrment Yas No If yes, specily Hearing Impaiment Yes No' If yas, speclly Speech Impairment 0 Yes No If yes; specly Olher; specly Signature:' Date _(monthlddlyvyY) Time Iam Scpt/0 2025 LRoQ 5 HHN-0936 (07/25) Page 0l @
================================================================================
PAGE 27
================================================================================
2026-01-30 13:46
SJRH HR ROI 6487726 >7 5068475837
P 8/36
SCHILZ, CRAIG ALEXANDER P SJR-EO-UAG-J2A 432086 DQB; 23-Mar-1890 35y Mala RegP:NB WHSCC AOM: 10-S0p-2025 12.06 Logon; Clalro Evolyn (NP) ATT emeriemer OBrlen; Chrlstopher P Prlinory: 506 0502122 Long: Gngllsh
0(duau DI BaNTI Horizon Referral for Communlty Addiction and Mental Health
Referral t0 Community Child, Yauth; and Adult Addlctlon and Mental Health Services can be made by youth, Slly 7.4 Stck Fuubk Postal Code famllles, schools, prlmary care provlders, hospilals, and Homd Phon850g L5b.2I2Cell Phane_ communlty servlce pravlders; Noto; Incomploto fom? moy bo rotumod (or eddlllonol Infonmollon, Il (hls Is an omorgonGy, relor to lhe locol Emorgency Doportmont: Reason for Referral (presenting concerng, key symptoms) P}_Qeds Px Koaadkg Elasc k _pyubatsLwollsh_aAuNP sy
Additional Information Prefarred Name CLaiq Emergency ContacVNexl of Ri If appllcable, School Grade TeacherIEducational Assistant _
Gender Idenllied Male Tolephone
Telephone
ParenULegal Guardlan ParentLegal Guardlan Telephone Oiher Telephone Olher Can be contacted as ParenvGuardlan 0Yes 0No Can be conlacted as ParenvGuardian Yus 0No Prlmary Care Provlder _ DOBrien Talephone Fanly PhycicloniNureo PreciillnorCiinizolhor Treatlng Psychlatrlst Telephone Pharmacylpharmaclst Telephone Employee and_FamilyAssistance Program or Prlvate Insurance P Yes CI No Medications Current Medlcallon Llst attached ONIA Yos No; If NO, Ilst medlcation details below
Referral Source Information Referring Source/Agancy SHt Tolophone_ 56 648 64 9 Address SRh Roferred by (prlnu) _ Euroc Signature 1ye_ MA Dato of Referral (monlhiddlyyy) 3otllo7025 Cllent Awaro f Roforral [Lya} 0No Call er Fax comploted relerralto You local centre: Fredericton Area 506-453-2132 Saint John Area 506-658-3737 Moncton Arca 506-856-2922 Fax Numbor 508-452-5533 Fax Number 506-858-3739 Fax Numbor 506-856+2995 Upper Rlvor Valley Area Charlotto County 506-466-7380 Fax Numbar 506-468-7501 Perth-Andover 506.273-4701 Miramlchl Area 506-778-6111 Fax Number 508-273-4728 Sussex 506-432-2217 Fax Number 506-778-5296 Fax Number 506-432-2046 Woodstock 506-325.4419 Fax Number 506-3254610 HHN-1479 (12/24)
================================================================================
PAGE 28
================================================================================
2026-01-30 13:46
SJRH HR ROI 6487726 77 5068475837
P 7/36
Horizon Health Network
Consult/Referral Mental Health ED Order Requisition New Ordcr(s)
ISCHULZ, CRAIG ALEXANDER P Agc: 35y PPRN/VisltID: 432086 / 18417309 DOB: 23-Mar-/ 990 Mcdicarc: 918954306 Scx: Male ADM Datc: 10-Sep-2025 12,06
Assigncd Loc: Servlcc: Attending: Fomlly MD: Visit Rcnson;
SJR-ED-URO-324 Emergency Mcdicine / Einergency Medicine Logan, Claire Evelyn (NP) 0'Brien, Christophcr P Lacerntion Puncturc
Lang 0f Choicc: Euglish Addrcss: 74 STOCK FARM ROAD QUISPAMSIS, New Brunswick EZGZAZ Allercies: No Known Allergics Requcsted For: Logan; Claire Evelvn (NP) (Nurse Praceitioner) Entered Dv: Decker; Kendra D (Registercd Nurso)
Telcphonc Number: Hoine: Cellulor:
506 6502122 506 6502122
Resp For Paymcnt: NB WHSCC Entcred Datc: J0-Scp-2025 !7448
Ordercd Item: consulc mental hcalth CD Ordcr ID: OOIRQQKGL consulc status; tean at bedsidc Notified On By Report of Consultation Ieakdau _fsu_thi soaudl Rlaaa Sc_atle MonbA hoel + eahliche_Esos
Date; Sut L4 74zs Consultant; Sleska_llslu M)
Printed from: SJR-NonPatient-CD McntolHcnlch RF_AI} sch{c)ub,/(l 5un762047 Pagc; 1 0l' [
Printed Dntc: 10-Scp-2025 17:19
End of Rcporf
================================================================================
PAGE 29
================================================================================
2026-01-30 13:45
SJRH HR RO[ 6487726 77 5068475837
P 6/36
#ictav DI LANTI Horizon Kastm
Nai SCHULZ; CRAIG ALEXANDER P Sjr-ED: WRI Adc MRI (Magnetic Resonance Imaging) 432086 DOB; 23.Mor-1930 35y Male PATIENT SAFETY SCREENING FORM Dal RosP;NB WHSCC ADM: 10-Sep-2025 12.06 Gonerlc; Clinlelon ATT emeriemer Completion of this form prlor O'Brien; Chrletopher P The MRI system has & very strong magnetic Ield that may 'be hazardai3 {6 Irdlviduals enterlng the procedure room If they have certaln metallc, electronlc; magnellc; or mechanlcal Implants, devlces or objecte. Please answer all of the following questions careully Be advised,the MRIsystem is ALWAYS onl Please Indicate If you have any of the following; YES No Provide details (datehospltal; body part etc;) Aneurysm clipfs) ! brain surgery Cardiac pacemaker / paclng wires Implanted cardioverter defbrllator (ICD) Heart valve prosthesis Neuro, Spinal cord,or Bone stimulalor Internal electrodes; wires Or loop recorder Electronic implant or device Metallic stent; Iiltec; Or coll Shunt (spinal or intraventricular) Vascular access port andlor catheter Insulin or medlcation Intusion pump Medication palch (Nicotine Nlroglycerine elc) Cochlear stapedial, or Olher ear implant Hearng aid Eyelid spring Or wire Any type Of prosthesls or Implants (eye_penile_breast etc) Previous eye_injury_involving a metal object Melallic chips or sliver in eyes or skin [e WOEFnLCC -NALL Surglcal slaples clips, or melallic sutures Jolnt replacement (hlpuknee;etc ) Prosthetic limb Boneljointpin, screw; nail,wireplateelc; Intraulterine contraceptc dovice (IUD)L Dentures; dental implants or braces Tattoo or permanent makeup Body piercing jewely Previous MRI or CT Scan Previous surgery Received Feraheme (iron inlectlon) wlthln Ihe past 3 months Are Ypu pregnant or thinkyou might be? Areyou breast feeding? Weight; 150 Height: Please consult the MRI Technologist or Radiologlst If you have any questiong regarding the information on this form Form completed by: Lune Suttz Designation:_ Patients signature; Date; 29_ [10-2c2 S
Technologist's signature; HHN-0398 $ (02/15)
================================================================================
PAGE 30
================================================================================
2026-01-30 13:45
SJrH HR RO[ 6487726 77 5068475837
P 5/36
Wo rksa F E Medical Form 8-10 TAAVAIL SECURITAIRE NB Necd belpz Gall 1 877 647-0777 PAGE I: WORKSAFENB copv 0r 90 (0 wopksofenb ca/form-&-10 Provlde Ulals page to WorkSaloNB, Emall scaircly Brough WerkSaleNe' s MyServlccs orlax to 1 888.629-4722,Ifthepage hss bcen cmslled oc laxcd; 0O NOT mall the orlglnal,
Flrsc Medical Report of Accident or Occupatlonal Dlsease Medical Progress Report Medlcarcu: 918-954-306 Clblm $ Vsl dole: 2026 09m 10 Tlle: 12,064* SCHULZ Aist njmg; CRAIG Male Lzsl nJnN: Female Ox we: 1990 03:' 23 1 Address; 74 STOCK FARM ROAD CIlynown; QUISPAMSIS Province: NB Postal cod; E2C2A2 Phonc: (506) 650-2122 Date dllldcnt: 2025 09. 10 Employer; Mike HENDERSON ROOFING AND REPAIR Oipailoi: ROOFER Acute straln/spraln Frqure Concusston/mta1, head ljusy whh: Otherar prevkaous lajuvy centrlbullng lo delaved recovery: Repelltive straln Inlury Allered nxntol sttc foaldelkh ~Othcr InluryAllncss (example: Iaceratlon o7 psych, Inlusy) Amnesls LOC (please speaily}: Luevcicn Deselptlon ofoccupatlon:l Injury/ inces (pleuse prevlde obJec lvc/sublectlve (Indlngs}: Boty Lelt Alght Dody pJn Lel Alght H# hand O6 Kietal TOap port UTD Baw Shoulder Hand/dlgll lul 65"1 na && Aosea tendon Eibow Hlp/Thlgh Wilst ; Kncc I8 4 sutllres _ Foream 8 Ankle/foar 1 Ncck D Vpperback Lowcr bask Olher analomkcal struclure (not Caplured abovc) (please speclly); If mcukal crogress fcport: Subjecllve pregrers; Improvee Unshanged Rcgressee Objective pogresc: Improved Unchanged Ocgresscd Inaddltlon (o (hls [erm; please altach applleable cllnlke(s)keharts) Dlagnosis (bcst wozking}; Dlagnostlc ordercd: CT BMG MRl Kry Leceva im Olhet;_ Faclllly; Treatment plan Indudcs; Chlro Physlo Speclallst refenol Dr. Rx; Phyekrhearuacconal ablllees recommendsllons (plepso provlde Eaczof chls loto (0 paclenc}: Olher Ilmltallans (reducd hours, Ilmlrallons duc (o medlcatlon; ete }: 1. Medically able ta periom usvsl work dulles: wil Abed Sntuve 2 Madlkally ableunable Io perfem dutlcs 2 dcballed balow. WorkSalcNB mayartange a lormal asscssmeal { of funallonalpbilllcs, {eMvey in Iodlays Funetlon Able Unable Funczion Ablc Unablc 1 Dend / Twlst Push(Pull Upper extoerlikcs Usc #D " Jita (Ilmb Sik Molor vehiele Uxe Kncel Stand Publlc Gransporlallen use E7 U6 Walk Keavye yequlpment operallen Valid (or _ daps (asnlmum 2 weeks withevr addltbonal rvkw)
Hesllh -
================================================================================
PAGE 31
================================================================================
2026-01-30 13:45
SJRH HR RO[ 6487726 >7 5068475837
P 4/36
NIOIAV DI DANII Horizon
SCHULZ, CRAIG ALEXANDER P SjR-ED:URG-324 432086 DOD; 23-Mar-1090 35v Molo ResPiNB WHSCC ADM; 10-S0p-2025 12,00 Logan, Claire Evelyn (NP) ATT emeaiemer O'Brlen. Chrigtophor P Prlmgry; 506 6502122 Lang: Erglish
EMERGENCY DePARTMENT 'Facllily: Salnt John Reglonal Hospltal St, Jogephts Hogpllal Sussex Heellh Centre Fundy Heallh Centa Cherlotte Caunty Hospllel Grand Manan Hospltal MfAL sioNsi:
"'6
MEDIcATION: NG 1e Fic7 " Dober Ria; BiGWATuRE_ EffeCT
'Yime;
Me
Drie
BR;'
'PuLIe" RESR;:
'TEMR; 'aLu; _ '02 SA1 'FIOz" 'Inizinl'
RNTRAVENoiS' Bize Sne
Time_
MsoLutiov:
#AMOUN
RAIE'
'SIONATURE,
DATE;' mddl :
time; '24' Hr DEPZ' PelezoJL3 Nut
Focus;
Dale ,
Adilpr; R Response; P_Plen' 0;_bebvehl_Avu_fuona ImSlAAdieuuLad4 Nlin-puqatatton_fLe_niabl hallh 0Iieud Pi Mad Rod } Levuostebt delicd Waei } Mh_pals haun Sale_ballfp_aad Eshid_D_WalraA lisg -buloAAtavo skady S hiAu E~del_
eLmh
60208 5 (19/07)
================================================================================
PAGE 32
================================================================================
2026-01-30 13:44
SJRH HR RO[ 6487726 >> 5068475837 P 3/36 Nfdoa| 45 Horizo;: 'Hcalth Net ,ji' Skl AdzEzS1 PPRN Saint John Regional Hospital 'isit ID Emcrgency Department Rccord Permanent Chart Documcnt Plnecricnt: SJR-ED- WRI Inbelnks; Lang or Choicc; English PPRN: 432086 VisitlD: /8417309 Rcg By: FOH3O6 47 Reg Datc: ]0-Sep-2025 12;06 Hrg SCHULZ, CRAIC ALEXANDER P Gender: Male DOB: 23 Mar |990 Agc: 3Sy RCL; Roman Catholic 74 STOCK FARM ROAD Primry: 506-650-2122 Coll: 506-650-2122 Mcdicarc; 918954306 QUISPAMSIS Ncw Brunswick Canda EZGZAZ Rcsp of payment: NB WHSCC Family; OBrien, Chrisiopher P Trlogo Lovol ATT; Generic, Clinician MS: Single Semi-Urgvn Mode of Arrival: Walking Admit Source: 01- Homa Employer Namc: MIKE HENDERSON ROOFING AND REPAIRAce Datc: I0-Sep-2025 Allergies SDM Pltono: 506-333-527 Drugs; No Preseating Complaint: Lacerarion Puncturc SDM: MACDONALD; WILL Lulex: No List CR Visit SJR; (4-Dec-2015 Lnst UCC Visic SJU:l /-Sep-2012 List INPT Visit: Nurscs Nwmc; Hall, Andren (Registered Nursc) Timc Sccn;_40-Scp-2025 12*07 Tringc Ihnas cut to left dorsa/ ofhand; cut on metel et work: tetanus utd es per Pl, opprox 3" laca bleeding controlled: good CSM distal, Nokcg: Vilnl BpL dpn 134/90 T 36.6 P ioi RR 18 0z Sntvioz 98 WT PAIN I/I0 PERL GCS 15 DV Signn POC Glu Minovl POC Clucote Raidoin Relroixa Inlarval;alyr; 2,$-5.8 Ininolil, >lyg: 3,5.7.7 nMIl/L UT ?0 Yes Nv Mleds; 4 AeeOmE 3E 1 Nurxlng AL Nolcn: Numcs TSignulurc/Designoliain Sep Notes Tlme; PHYSICIAN ORDER(s): HZEXIin_reood Menaks 0SMTaM
PHYSICIAN NOTES: Tlno Scen (230 11 Onser ofSymplons (Dole & Timel dlejetioes_Zn Laueent E SCuf oh Nal Jeck_unsure evac JMehahifn c ADAP last Donte> 61455 1ETE2 i1 HaschidWAL ] Fonaail Hto EOE aaHin HHe ~anIT Pi QiendenQ Eax .8 Talmidlln2porsal hahA 4+ox4 GSLWV IEZTEeeGna "baal Es]4t: Baataa Inkut sartiy dainane Yetlen Post ~CcMussion 6S MttalyD sutueWubZ[IH rviened May_ccnt nbcL Sralz Ha EbedL mo Qsych / DPE M@Ladeahara @aauk Dingnosis: aRa Of dzzeun Disposition; Admitted Trnsfer; Died Dischgree Time: [PuvsiCiAVBieel BIGNATURO] Ist MD: Time Admitted; _ Time: Condition:D Improved DUnchanged Location; Coroncr; Info Shcets; Znd MD: Tronsfer' Time: PM: Rx: House Staf: _ Wulked Qut Eyo Bank: Time to Improve: _ Allqiding Phyxlcnnn 44 Dischnse Printed af; |0-Sep-2025 |2.23
================================================================================
PAGE 33
================================================================================
2026-01-30 13:44
SJRH HR ROI 6487726 >> 5068475837
P 2/36
Reseau de SANTE Horizon HEAiTh Neiwork
Salne John Reglonal Hospltal Health Records Department
P.O: Box 2100, Salnt John; N.B: EZL 412 Phone; (506) 648-6981 Fax: (506) 648.7726
30 January 2026
CONFIDENTIAL
Craig Schulz 74 Stock Farm Rd; Quispamsis, NB EZg 2A4
RE: Schulz, Craig Alexander DOB: March 23, 1990 PPRN: 432086
Dear Mr, Schulz;
Please find enclosed the information requested from the Saint John Regional Hospital from September 10, 2025 to December 31, 2025.
Kindest regards,
L Angela White; CHIM Release of Information Horizon Health Network Reseau de Sante Horizon Saint John Regional Hospital 400 University Avenue Saint John, NB EZL4LA Tel: (506) 648-6981 Fax: (506) 648-7726 [oisaintiohn@horizonnb-ca
================================================================================
PAGE 34
================================================================================
2026-01-30 13:44
SJRH HR ROI 6487726 >> 5068475837
P 1/36
Reseau De JANTE Horizon HeaLTH N[TwOrK
FAX / TELECOPIE
To DESTINATAIRE :
FROM / EXPEDITEUR :
Name: Nom
Craig Schulz
Name; Nom
Release of Information 46u= A La
Dept: Servlce
Dept; Servlee
Health Records
0[t78947878
Compjny; Soclete
Edcblissement = Saint John Regional Tel & 506-648-6981 Telephone Fak # 506-648-7726 telecopleur eean Pagoks) In total, Includlng covor: Nambra ta*a/ do 00p0s 37 [tj"#X= M Lennnnenneehaenennnanennelttiatacilot
Tel %; Toiophona
506-650-2122
Fax # Telecoplaur 506-847-5837 WANAT Lenen Jed[ 104915791949+400t807t1[
Date: Dato
January 30, 2026
NOTES REMARQUES :
Thank you
Shelley Brown; CKIM Release 0f Information Offlcer Saint John Regional Hospital/ Hopital regional de Saint John Horizon Health Network/ Reseau de sante Horizon 400 University Avenue Selat John; NB EZLAL4 Tel: (506) 648-6981 Fax: (506) 648-7726 [oisainliohn@horizonnbca wHorizonnb c2
CONFIDENTIAL NOTICE The documencs accompanylng thls telecopy transmlsslon contaln confldentlol lIogally Prlvllogod Informatlon, belonglna F0 the sender The Information is Intended only for the Us0 Of tho Indlvldual Or entlly mentlonad above. If you are not the Intended reclpleg, YQu Jfo horoby notllled thoc dny Use; dlsclosure; eepylng; or dlstrlbutlon %8 thls Inlormaeion Is strlctly prohlbltod: If you havo received thls Ielecopy In error please notlfy Us by tolcphono Immadlatoly to arrango tha roturn ol tha orlglnal documants:
NOTE RELATIVE A LA CONFIDENTIALITE Los documents cllolnts contlonnont dos ronselgnomonts confldentlels et privllegles qui appartlannene & rexpodlteur nommo cl-dessus. Seule Inpersonne Ov entite 0 aul Ils sont adrossos Ost 0n drolt do Ios utlllser Sl vouS nacos pas lo deselnaralre viso, nous vous avlsons qu"Il ost strictomcnt Intordlt dutlllsor cetto Inlormatlon; do I4 dlvulguor; dc Ia coplor Ou do Ia dlstribuor Sl vous I'avez rocu par errqur: vquilloz qn avisor rexpediteur sans delal Par lciophone pour quq nous_pulssons prendre des dlsposltlons pour recuperer les documents:
Www.HorizOnNB ca
================================================================================
PAGE 35
================================================================================
2026-01-30 14:09
SJRH HR ROI 6487726 77 5068475837
P 36/36
Horizon Health Network Ordcr Summary By Paticnt Rclcasc of Information Legend for Report's Order Ieons Stat Sroc order is one Vhat nccds to bc carried out iinmedieltely PRN pH PRN order is administered on an aS-nccded basis Modificd Order hos bcen modified and has a history Conditionnl ?1 Condition orders are ordcrs that do not bccome aelive until a defined condition has bccn met Order Sets ere groups of Orders commonly placed at one time Order Sct Standard Order Sct orders display in 0 single column Linked Set A linkcd order set is whcrc one or more items are required when ordering und thc items arc dependent on one another
Hold Hold Orders are ordcrs !hat are not needed at thc current timc Suspcnd Suspcnding an order cnables you to put & temporary hold on an order that is active Rcpcat Mastcr Mastcr order of an ordcr cnlered (0 be repeated for specified numbsr of occurrenees Rcpcot Child Indicates the repealing order for each ofthc Spccit fcd number of occurrences Dischargo Dixchargc scssion type is used for plecing order for # patient that Is being discharged Clinical Path clinieal Path organizes the expected orders that should occur uround & time linc Documcnt(s) @ Documentation has bccn attachcd 0 the order. Please consult the electronic rccord for dcleils.
Requcsted By; Whitc; Angcla Dnwn (HIM Prolcssional) Printcd Trom: SUR-NonPaticnt-McRcc-07 Printcd gt: 30-Jan-2026 1:21 End or Rcport Page 4 of 4 SO2IWVSQHDBPOZA-cdolaullb-Prod RB_ALL_OrdSumByPalRlaInfo rdl | OrderSummuryByPatRlsInfor | 63043563`),
    status: 'needs_review',
    dateAdded: new Date().toISOString().split('T')[0],
  },
];

const MedicalRecords: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>(() => {
    const saved = localStorage.getItem('medicalRecords');
    return saved ? JSON.parse(saved) : initialRecords;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [newRecord, setNewRecord] = useState<Partial<MedicalRecord>>({
    title: '',
    source: '',
    dateOfRecord: new Date().toISOString().split('T')[0],
    ocrText: '',
    status: 'needs_review',
  });

  useEffect(() => {
    localStorage.setItem('medicalRecords', JSON.stringify(records));
  }, [records]);

  const handleAddRecord = () => {
    if (!newRecord.title || !newRecord.ocrText) return;

    const record: MedicalRecord = {
      id: Date.now().toString(),
      title: newRecord.title,
      source: newRecord.source || 'Unknown',
      dateOfRecord: newRecord.dateOfRecord || new Date().toISOString().split('T')[0],
      ocrText: newRecord.ocrText,
      status: newRecord.status || 'needs_review',
      dateAdded: new Date().toISOString().split('T')[0],
    };

    setRecords([record, ...records]);
    setIsAdding(false);
    setNewRecord({
      title: '',
      source: '',
      dateOfRecord: new Date().toISOString().split('T')[0],
      ocrText: '',
      status: 'needs_review',
    });
  };

  const handleUpdateRecord = (id: string, updates: Partial<MedicalRecord>) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteRecord = (id: string) => {
    if (window.confirm("Are you sure you want to delete this medical record? This action cannot be undone.")) {
      setRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Stethoscope className="w-6 h-6 text-blue-400" />
          Medical Records
        </h2>
        <button
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingRecordId(null);
            setNewRecord({
              title: '',
              source: '',
              dateOfRecord: new Date().toISOString().split('T')[0],
              ocrText: '',
              status: 'needs_review',
            });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          {isAdding ? "Cancel" : "Add New Record"}
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-800 p-6 rounded-lg border border-blue-500/30 animate-fade-in shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2 uppercase tracking-wider">ADD NEW MEDICAL RECORD</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Document Title</label>
              <input
                type="text"
                value={newRecord.title}
                onChange={e => setNewRecord({ ...newRecord, title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="e.g., SJRH Medical Fax"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Source / Clinic</label>
              <input
                type="text"
                value={newRecord.source}
                onChange={e => setNewRecord({ ...newRecord, source: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="e.g., Saint John Regional Hospital"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Date of Record</label>
              <input
                type="date"
                value={newRecord.dateOfRecord}
                onChange={e => setNewRecord({ ...newRecord, dateOfRecord: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Status</label>
              <select
                value={newRecord.status}
                onChange={e => setNewRecord({ ...newRecord, status: e.target.value as MedicalRecord['status'] })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="needs_review">Needs Review</option>
                <option value="reviewed">Reviewed</option>
                <option value="flagged">Flagged for Counsel</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-slate-400 text-xs uppercase font-bold mb-1">OCR Text (Paste 36 pages here)</label>
            <textarea
              value={newRecord.ocrText}
              onChange={e => setNewRecord({ ...newRecord, ocrText: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-blue-500 focus:outline-none h-64 font-mono text-sm"
              placeholder="Paste the full OCR content of the medical fax here..."
            />
          </div>

          <button
            onClick={handleAddRecord}
            disabled={!newRecord.title || !newRecord.ocrText}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center gap-2 uppercase tracking-widest"
          >
            <Save className="w-5 h-5" />
            SAVE MEDICAL RECORD
          </button>
        </div>
      )}

      <div className="space-y-4">
        {records.map(record => (
          <div key={record.id} className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-600/50 transition-colors shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-white mb-1">{record.title}</h3>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {record.dateOfRecord}</span>
                  <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> {record.source}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                  record.status === 'reviewed' ? 'bg-green-900/30 text-green-400' :
                  record.status === 'needs_review' ? 'bg-amber-900/30 text-amber-400' :
                  'bg-red-900/30 text-red-400'
                }`}>
                  {record.status.replace('_', ' ')}
                </span>
                <button
                  onClick={() => setEditingRecordId(record.id === editingRecordId ? null : record.id)}
                  className="p-2 text-slate-400 hover:text-blue-400 rounded-full hover:bg-slate-700 transition-colors"
                  title="Edit Record"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteRecord(record.id)}
                  className="p-2 text-slate-400 hover:text-red-400 rounded-full hover:bg-slate-700 transition-colors"
                  title="Delete Record"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {editingRecordId === record.id ? (
                <div className="space-y-4 bg-slate-900 p-4 rounded-lg border border-slate-700 mb-4">
                    <h4 className="text-md font-semibold text-white">Edit Record Details</h4>
                    <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Document Title</label>
                        <input type="text" value={record.title} onChange={e => handleUpdateRecord(record.id, { title: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Source</label>
                        <input type="text" value={record.source} onChange={e => handleUpdateRecord(record.id, { source: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Date of Record</label>
                        <input type="date" value={record.dateOfRecord} onChange={e => handleUpdateRecord(record.id, { dateOfRecord: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-1">OCR Text</label>
                        <textarea value={record.ocrText} onChange={e => handleUpdateRecord(record.id, { ocrText: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white h-48 font-mono text-sm" />
                    </div>
                    <button onClick={() => setEditingRecordId(null)} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm">Done Editing</button>
                </div>
            ) : (
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 max-h-96 overflow-y-auto font-mono text-sm text-slate-200 leading-relaxed">
                <pre className="whitespace-pre-wrap">{record.ocrText}</pre>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-700/50 pt-3">
              <span>Added: {record.dateAdded}</span>
              <button
                onClick={() => {
                  const blob = new Blob([record.ocrText], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${record.title.replace(/\s/g, '_')}_${record.dateOfRecord}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                title="Download OCR Text"
              >
                <Download className="w-4 h-4" /> Download Text
              </button>
            </div>
          </div>
        ))}

        {records.length === 0 && !isAdding && (
          <div className="text-center p-8 text-slate-500 border border-dashed border-slate-700 rounded-lg">
            No medical records found. Click "Add New Record" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export { MedicalRecords };