import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  select: {
    width: "200px",
    height: "50px",
    padding: "1px",
    margin: "5px",
    color: "blue",
    textAlignLast: "center",
    float: "left",
    "& .MuiSelect-selectMenu": {
      padding: "2px 20px 2px 5px",
      lineHeight: "30px",
      textAlign: "center",
      color: "blue",
    },
  },
  selText: {
    width: "80px",
    margin: "5px",
    textAlign: "center",
    float: "left",
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input": {
      padding: "0",
      height: "50px",
      textAlign: "center",
      color: "blue",
    },
  },
  powerText: {
    width: "80%",
    height: "40px",
    lineHeight: "40px",
    margin: "5px 0",
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
    float: "left",
  },
  btn: {
    height: "40px",
    margin: "5px",
    padding: "0",
    float: "left",
  },
  dlgText: {
    height: "30px",
    fontFamily: "Jua",
    marginBottom: "10px",
  },
});

const Menus = withStyles({
  root: {
    minHeight: "40px",
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

export default function Skill() {
  const classes = useStyles();
  const [openHelper, setOpenHelper] = useState<boolean>(false);

  const [type, setType] = useState<number>(0); // 직업
  const [parts, setParts] = useState<number>(0); // 부위
  const [name, setName] = useState<number>(0); // 기술능력

  const [sInput, setSInput] = useState<number>(0); // 입력 수치
  const [sNumber, setSNumber] = useState<number>(0); // 기술능력 번호
  const [skillPower, setSkillPower] = useState<number>(0); // 기술능력 전투력

  // prettier-ignore
  var skills = [
    [],
    // 전사 - 목, 투구, 무기, 갑옷, 망토
    ["후면공격	발동확률(+)", "측면공격	발동확률(+)", "광폭	쿨타임(-)", "광폭	피해증가율(+)", "광폭	지속시간(+)", "백호령	피해증가율(+)", "백호령	지속시간(+)", "운상미보	이속증가율(+)", "어검화	피해량(+)", "기력방패	마력소모도(-)", "기력방패	방어 증가(-)"],
    ["극백호참	피해량(+)", "극백호참	쿨타임(-)", "노호검황	피해량(+)", "노호검황	쿨타임(-)", "표호검황	피해량(+)", "표호검황	쿨타임(-)", "혈겁만파	피해량(+)", "혈겁만파	쿨타임(-)", "천둥낙뢰	피해량(+)", "천둥낙뢰	쿨타임(-)", "현무섬멸	피해량(+)", "현무섬멸	쿨타임(-)", "발도술'시공참	피해량(+)", "명천검강	피해량(+)", "비검술	피해량(+)", "비검술	쿨타임(-)"],
    ["건곤대나이 피해량(+)", "동귀어진	피해량(+)", "동귀어진	체력소모도(-)", "백호참	피해량(+)", "백호참	체력소모도(-)", "회선돌격	피해량(+)", "회선돌격	pvp 쿨타임(-)", "황룡승천	피해량(+)", "황룡승천	쿨타임(-)", "초혼비무	피해량(+)", "초혼비무	체력소모도(-)", "쇄혼비무	피해량(+)", "쇄혼비무	체력소모도(-)", "극'어검무	피해량(+)", "극'어검무	체력소모도(-)", "흑룡참파	피해량(+)", "흑룡참파	체력소모도(-)"],
    ["측후방어	피해감소율(+)", "측후방어	고정피해감소(+)", "자혈갱생	회복량(+)", "자혈갱생	쿨타임(-)", "석갑	쿨타임(-)", "석갑	지속시간(+)", "살신보은	피해감소율(-)", "살신성인	쿨타임(-)", "살신성인	피해감소율(-)", "운기	피해량(+)", "의지의외침	쿨타임(-)"],
    ["타척보	pvp 쿨타임(-)", "타척보	은신제한시간(+)", "육감주망	은신발견률증가(-)", "육감주망	은신제한시간(+)", "유인	지속시간(+)", "도발	pvp 쿨타임(-)", "도발	지속시간(+)", "미혼강격	방향상실률(+)", "미혼강격	지속시간(+)", "호통	피흡감소(+)", "호통	피흡증가(+)", "반격	피해량(+)", "반격	지속시간(+)", "반격	쿨타임(-)", "무장해제	pvp 쿨타임(-)", "무장해제	지속시간(+)"],
    
    // 도적 - 목, 투구, 무기, 갑옷, 망토
    ["무영보법	명중회피(+)", "투명	피해증가율(+)", "전혈	지속시간(+)", "전혈	전환율(+)", "전혈'첨	지속시간(+)", "전혈'첨	전환율(+)", "운상미보	이속증가율(+)", "은형연막탄	직타저항(+)", "은형연막탄	피해흡수(+)", "은형연막탄	쿨타임(-)", "묵혈광참	피해량(+)", "묵혈광참	피해량 감소(-)", "묵혈광참	방어 감소(+)"],
    ["파천검무	피해량(+)", "파천검무	쿨타임(-)", "파천검무참	피해량(+)", "파천검무참	쿨타임(-)", "분홍경천	피해량(+)", "분홍경천	쿨타임(-)", "화무십일홍	피해량(+)", "화무십일홍	쿨타임(-)", "난도질	피해량(+)", "난도질	쿨타임(-)", "연격	피해량(+)", "연격	쿨타임(-)", "무영검	피해량(+)", "무영검	방어 감소시간(+)", "무영검	방어 감소(+)", "은형파천무	피해량(+)", "은형파천무	쿨타임(-)"],
    ["필살검무	피해량(+)", "백호검무	피해량(+)", "백호검무	체력소모도(-)", "멸아검무	피해량(+)", "멸아검무	체력소모도(-)", "혈풍도참	피해량(+)", "혈풍도참	체력소모도(-)", "은형참절도	피해량(+)", "은형참절도	피흡감소 피격횟수(+)", "암살	피해량(+)", "암살	침묵시간(+)", "이기어검	피해량(+)", "이기어검	방어 감소시간(+)", "이기어검	방어 감소(+)", "무형검	방어 감소시간(+)", "무형검	방어 감소(+)"],
    ["측원방어	피해감소율(+)", "측원방어	고정피해감소(+)", "분신	지속시간(+)", "지옥무영	쿨타임(-)", "생환대법	쿨타임(-)", "생환대법	부활회복량(+)", "살신보은	피해감소율(-)", "운기	회복율(+)", "혈패파천도	피해량(+)", "수리검투척	피해량(+)"],
    ["술법가르기	피해량(+)", "술법가르기	쿨타임(-)", "얼음장막	이속감소율(+)", "얼음장막	쿨타임(-)", "독검	지속시간(+)", "독검	쿨타임(-)", "타척보	pvp 쿨타임(-)", "타척보	은신제한시간(+)", "기술봉인	지속시간(+)", "기술봉인	쿨타임(-)", "부동력	방어 증가(+)", "묵혈파안도	피해량(+)", "묵혈파안도	체력소모도(-)", "묵혈독무	폭발피해량(+)", "묵혈독무	체력소모도(-)"],
    
    // 주술사 - 목, 투구, 무기, 갑옷, 망토
    ["마력집중	쿨타임(-)", "마력집중	변환량(+)", "지옥연화	피해증가율(+)", "염화강체	쿨타임(-)", "쾌속시전	시전시간 감소율(-)", "즉발시전	쿨타임(-)", "즉발시전	쿨타임 반영율(-)", "파무쾌보	이속증가율(+)", "보호	피해감소율(+)", "무장	방어도(+)", "생사부	추가피해량(+)", "생사부	쿨타임(-)", "생사부	지속시간(+)"],
    ["사슬벼락	피해량(+)", "사슬벼락	마력소모도(-)", "십자소환파상겁	피해량(+)", "십자소환파상겁	마력소모도(-)", "십자소환파상겁	쿨타임(-)", "용의잔상	피해량(+)", "용의잔상	마력소모도(-)", "용의잔상	쿨타임(-)", "지폭지술	피해량(+)", "지폭지술	쿨타임(-)", "폭류유성	피해량(+)", "폭류유성	쿨타임(-)", "폭류유빙	피해량(+)", "폭류유빙	쿨타임(-)", "염화지옥	피해량(+)", "지옥홍염	피해량(+)", "지옥홍염	마력소모도(-)", "천뢰마옥구	피해량(+)"],
    ["화염주	피해량(+)", "화염주'첨	피해량(+)", "지옥인화	피해량(+)", "지옥인화	쿨타임(-)", "지옥인화	마력소모도(-)", "삼매인화	피해량(+)", "삼매인화	쿨타임(-)", "삼매인화	마력소모도(-)", "노도성황	쿨타임(-)", "노도성황	지속시간(+)", "서리한파	피해량(+)", "서리한파	마비시간(+)", "화염지대	피해량(+)", "회선폭풍	피해량(+)", "회선폭풍	마력소모도(-)", "누리의기원	회복량(+)"],
    ["만공	쿨타임(-)", "호체주술	저주방어수준(+)", "호체주술	저주방어횟수(+)", "생환대법	쿨타임(-)", "생환대법	부활회복량(+)", "마력방패	피해감소율(-)", "석화	쿨타임(-)", "석화	지속시간(+)", "환기	회복량(+)", "환기	쿨타임(-)", "호신뇌전	쿨타임(-)", "호신뇌전	지속시간(+)", "공력증강	시전실패율(-)", "명상	초당 회복율(+)"],
    ["저주	방어 감소(+)", "혼마'첨	방어 감소(+)", "마기지체	방어 감소(+)", "침잠	피해량 감소(-)", "시전지연	시전시간 증가율(+)", "이어침각	이속감소율(-)", "마성제마술	쿨타임(-)", "타척보	pvp 쿨타임(-)", "타척보	은신제한시간(+)"],
    
    // 도사 - 목, 투구, 무기, 갑옷, 망토
    ["보호	피해감소율(+)", "무장	방어도(+)", "신령지익	쿨타임(-)", "파력무참	쿨타임(-)", "쾌속시전	시전시간 감소율(+)", "파무쾌보	이속증가율(+)", "무신의가호	공격력증가(+)", "무신의가호	마력증강(+)", "무신의가호	마법치명(+)", "무신의가호	방어구관통(+)", "투신의가호	타격흡수(+)", "투신의가호	마력흡수(+)", "투신의가호	명중률(+)", "투신의가호	시전향상(+)", "용신의가호	방어(+)", "용신의가호	피해감소율(+)", "용신의가호	직타저항(+)", "용신의가호	피해흡수(+)"],
    ["백호의희원'첨	회복량(+)", "백호의희원'첨	마력소모도(-)", "선기현원	절반 이하 회복횟수(+)", "선인의영역	회복량(+)", "선인의영역	쿨타임(-)", "천선의기원'파	회복량(+)", "천신팔괘진	지속시간(+)", "천신팔괘진	회복량(+)", "뇌전운무	피해량(+)", "뇌신의보호	쿨타임(-)", "신성광폭'갈	피해증가율(+)", "천광방패진	쿨타임(-)"],
    ["누리의기원	회복량(+)", "백호의희원	회복량(+)", "백호의희원	마력소모도(-)", "생명의비선	회복량(+)", "생명의비원	회복량(+)", "선산현원	회복량(+)", "지진	피해량(+)", "천광폭기	피해량(+)", "천광폭기	공격횟수(+)", "불괴신공	쿨타임(-)", "불괴신공	지속시간(+)", "불괴신공	시전실패율(-)", "흡체언령술	쿨타임(-)", "흡체언령술	피격횟수(+)"],
    ["생환대법	쿨타임(-)", "생환대법	부활회복량(+)", "반탄공	쿨타임(-)", "반탄공	반사율(+)", "측후방어	피해감소율(+)", "측후방어	고정피해감소(+)", "그림자방패	그림자당 방어횟수(+)", "반탄강공	피해량(+)", "공력증강	시전실패율(-)", "명상	초당 회복율(+)", "만공	쿨타임(-)", "마력방패	피해감소율(-)"],
    ["저주	방어 감소(+)", "귀염추혼소	방어 감소(+)", "귀염추혼소	쿨타임(-)", "침잠	피해량 감소(-)", "시전지연	시전시간 증가율(+)", "이어침각	이속감소율(-)", "천마흑사진	피해량 감소(-)", "타척보	pvp 쿨타임(-)", "타척보	은신제한시간(+)", "돌의장벽	쿨타임(-)", "돌의장벽	지속시간(+)", "돌의장벽	시전실패율(-)", "신성제마술	쿨타임(-)", "마성제마술	쿨타임(-)"],
    
    // 궁사 - 목, 투구, 무기, 갑옷, 망토
    ["참새의눈	명중률(+)", "신궁합일	무기파괴력 증가율(+)", "사격준비	공격력증가(+)", "사격준비	필살률(+)", "순간집중	쿨타임(-)", "운상미보	이속증가율(+)", "흑영의야수	피해량(+)"],
    ["작염시	쿨타임(-)", "화염장벽	피해량(+)", "화염장벽	지속시간(+)", "폭풍화우	피해량(+)", "폭풍화우	쿨타임(-)", "다발화살	피해량(+)", "다발화살	체력소모도(-)", "폭마일섬	피해량(+)", "폭마일섬	체력소모도(-)", "염화마탄시	피해량(+)", "염화마탄시	쿨타임(-)", "이기뇌전시	피해량(+)", "이기뇌전시	경직시간(+)"],
    ["미환탄시	피해량(+)", "투혈영식	피해량(+)", "투혈영식	쿨타임(-)", "선풍화우	피해량(+)", "선풍화우	쿨타임(-)", "풍마섬시	피해량(+)", "풍마섬시	체력소모도(-)", "천마류폭시	피해량(+)", "마염시	지속시간(+)", "마염시	쿨타임(-)", "독바르기	쿨타임(-)"],
    ["독수리소환	반격율(+)", "독수리소환	수면시간(+)", "방책설치	쿨타임(-)", "아공간격리	쿨타임(-)", "아공간격리	지속시간(+)", "운기	회복률(+)", "그림자방패	그림자당 방어횟수(+)", "낙뢰충전	쿨타임(-)", "실명화살	피해량(+)", "실명화살	명중률 감소(+)"],
    ["시즉무성	pvp 쿨타임(-)", "시즉무성	침묵시간(+)", "얼음바르기	쿨타임(-)", "얼음바르기	수면시간(+)", "대기파열	쿨타임(-)", "대기파열	수면시간(+)", "마혼효시	공격력증가 감소(+)", "마혼효시	회복감소율(-)", "미혼강격	지속시간(+)", "미혼강격	방향상실률(+)", "타척보	pvp 쿨타임(-)", "타척보	은신제한시간(+)", "족쇄화살	피해량(+)", "족쇄화살	속박시간(+)"],
    
    // 천인 - 목, 투구, 무기, 갑옷, 망토
    ["집중공격	쿨타임(-)", "집중공격	공격횟수(+)", "집중공격	방어도무시(+)", "집중공격	공격력증가(+)", "집중공격	마법치명타(+)", "집중공격	명중률(+)", "신성해제	쿨타임(-)", "찰나	추가피해증가율(+)", "순간체력증가	지속시간(+)", "순간체력증가	체력증가율(+)", "순간무기개조	마법치명타(+)", "순간무기개조	공격횟수(+)", "순간무기개조	무기파괴력 증가율(+)", "천금성륜	천기 회복량(+)", "지배술'광기	공격횟수(+)", "지배술'광기	마법치명타(+)", "지배술'용맹	체력증가율(+)", "지배술'총명	마력증가율(+)", "지배술'찰나	추가피해증가율(+)", "지배술'맹투의진	공격력증가(+)", "지배술'맹투의진	마법치명타(+)"],
    ["천제금강장강림	피해량(+)", "천제금강장강림	쿨타임(-)", "하늘의권	피해량(+)", "하늘의권	체력소모도(-)", "용조수'회흡	피해량(+)", "용조수'회흡	pvp 쿨타임(-)", "용조수'폭장	피해량(+)", "천금신권	피해량(+)", "천금신권	쿨타임(-)", "불가살이선풍	피해량(+)", "불가살이선풍	쿨타임(-)", "불가살이장군폭풍	피해량(+)", "불가살이장군폭풍	쿨타임(-)", "흉내쟁이	피해량(+)", "흉내쟁이	쿨타임(-)", "천성검'지폭열파	피해량(+)", "천성검'지폭열파	쿨타임(-)", "천금마검낙화	피해량(+)", "천금마검낙화	체력소모도(-)"],
    ["예리함	피해량(+)", "자아파괴	피해량(+)", "자아파괴	체력소모도(-)", "강인함	피해량(+)", "강인함	체력소모도(-)", "천마검멸천	피해량(+)", "천마검멸천	체력소모도(-)", "빙글번쩍	피해량(+)", "빙글번쩍	지속시간(+)", "뇌격구렁이	피해량(+)", "뇌격구렁이	쿨타임(-)", "수호구미호	피해량(+)", "수호구미호	피해흡수(+)", "폭주구미호	피해량(+)", "폭주구미호	이속감소시간(+)", "천금마창삼격	피해량(+)", "천금마창삼격	체력소모도(-)", "강림술'홍무기	삼족오'흑지룡 피해량(+)", "강림술'홍무기	회복량(+)", "강림술'홍무기	흑지룡 피해량(+)"],
    ["하늘기도	피격횟수(+)", "하늘기도	시전실패율(-)", "하늘기도	회복율(+)", "완전방어	지속시간(+)", "완전방어	피격횟수(+)", "하늘감옥	적 기절시간(+)", "하늘감옥	회복량(+)", "하늘감옥	쿨타임(-)", "집중방어	체력 회복량(+)", "집중방어	마력 회복량(+)", "집중방어	쿨타임(-)", "집중방어	피격횟수(+)", "집중방어	방어 증가(+)", "집중방어	피해흡수(+)", "천금시공장	쿨타임(-)", "강림술'신록	삼족오'신록 회복량(+)", "강림술'신록	회복량(+)", "강림술'신록	신록 회복량(+)", "영혼방패'팔괘진	회복율(+)", "영혼방패'팔괘진	쿨타임(-)", "영혼방패'방탄술	반사율(+)", "영혼방패'방탄술	쿨타임(-)", "영혼지배	쿨타임(-)", "영혼지배	체력반환량(+)", "시공의감옥	쿨타임(-)", "천선의강체	체력증가율(+)", "천선의강체	마력증가율(+)", "천선의강체	쿨타임(-)", "천선의강체	마법치명타(+)", "천선의강체	방어구관통(+)"],
    ["급시우	쿨타임(-)", "급시우	방어 감소(+)", "급시우	회복량(+)", "갑옷파괴	방어 감소(+)", "갑옷파괴	피해흡수 감소(+)", "파열	공격횟수(+)", "파열	공격력증가 감소(+)", "깊은상처	회복감소율(-)", "강림술'해치	삼족오'해치 방어 감소(+)", "강림술'해치	회복량(+)", "강림술'해치	방어 감소(+)", "지배술'파열	공격횟수(+)", "지배술'파열	공격력증가 감소(+)", "지배술'상실	피격횟수(+)", "지배술'상실	방어 감소(+)", "지배술'발매듭	피격횟수(+)", "지배술'발매듭	이속감소율(-)", "황천행	피격횟수(+)", "주문잠금	지속시간(+)", "지배술'약화의진	방어 감소(+)", "지배술'약화의진	피해흡수 감소(+)"],
    
    // 마도사 - 목, 투구, 무기, 갑옷, 망토
    ["마도향상	마법수준(+)", "시전연구	시전시간 감소율(-)", "시전강화	쿨타임 감소율(+)", "파괴력강화	무기파괴력 증가율(+)", "능력강화	능력강화율(+)", "흡공의맹약	기력 회복율(+)", "마법강화	쿨타임(-)"],
    ["기광선	피해량(+)", "기광선	체력소모도(-)", "기광선	쿨타임(-)", "광폭체마'강	회복량(+)", "광폭마흑진	쿨타임(-)", "광폭마흑진	공격력증가(+)", "광폭마흑진	마력증강(+)", "광폭마흑진	마법치명타(+)", "광폭멸천강	부패피해량(+)", "광폭멸천강	쿨타임(-)", "광폭멸천강	이속증가율(+)", "능력공유	최대 공유치(+)", "광폭기폭사	피해량(+)", "광폭기폭사	쿨타임(-)", "광폭기대방출	쿨타임(-)", "혈마광폭파	피해량(+)", "혈마광폭파	마력소모도(-)"],
    ["기공발출	피해량(+)", "마력구회격	피해량(+)", "마력구회격	체마소모도(-)", "음양구슬	회복율(+)", "음양구슬	회복량(+)", "기공구슬'화	지속시간(+)", "기공구슬'화	발동횟수(+)", "기공구슬'수	지속시간(+)", "기공구슬'수	발동횟수(+)", "기공구슬'뇌	지속시간(+)", "기공구슬'뇌	발동횟수(+)", "영혼의계약	쿨타임(-)", "영혼의계약	체력반환량(+)", "광폭공명'강	분담율(+)"],
    ["기공보호막	지속시간(+)", "기공보호막	피격횟수(+)", "광폭보호부'강	지속시간(+)", "광폭보호부'강	누적피해차감율(+)", "광폭철갑	반격율(+)", "광폭철갑	직타저항(+)", "광폭철갑	피해흡수(+)", "내성증폭	쿨타임(-)", "내성증폭	지속시간(+)", "마력보호	소모도 감소율(+)", "마력증폭	피격횟수(+)", "마력증폭	회복율(+)", "체마변환	변환율(+)", "체마변환	최대회복량(+)"],
    ["기공사슬	발동횟수(+)", "기공사슬	쿨타임(-)", "광폭부패'강	부패피해량(+)", "광폭부패'강	쿨타임(-)", "광폭침묵염파	침묵시간(+)", "광폭침묵염파	쿨타임(-)", "광폭증축기	쿨타임(-)", "광폭마진'강	쿨타임(-)", "광폭마진'강	직타저항(+)", "광폭마진'강	피해흡수(+)", "광마지폭	부패피해량(+)", "광마지폭	피해량(+)", "광폭기조사	피해량(+)", "광폭기조사	쿨타임(-)"],
    
    // 영술사 - 목, 투구, 무기, 갑옷, 망토
    ["요괴보호	쿨타임(-)", "폭주신령	쿨타임(-)", "폭주신령	소모도 감소율(+)", "폭주신령	쿨타임 감소율(+)", "나와라폭장승	피해량(+)", "나와라폭장승	쿨타임(-)", "나와라수호승	회복량(+)", "나와라수호승	쿨타임(-)", "괴선공격	피해량(+)", "괴선공격	고목승 체력증가율(+)", "괴선공격	폭장승 도발시간(+)", "괴선공격	수호승 무적시간(+)", "요괴질주	이속증가율(+)", "빙의:도깨비불	마법치명(+)"],
    ["도깨비파장	피해량(+)", "도깨비폭격	피해량(+)", "도깨비폭격	마력소모도(-)", "도깨비혼방출	피해량(+)", "도깨비침식	피해량(+)", "도깨비침식	마력소모도(-)", "화마질주	피해량(+)", "화마질주	쿨타임(-)", "화마질주	마력소모도(-)", "화요신권	피해량(+)", "화요신권	쿨타임(-)"],
    ["요괴직타	피해량(+)", "요괴회선	피해량(+)", "요괴격추	피해량(+)", "화염쓸기	피해량(+)", "화염회격	피해량(+)", "화염회격	쿨타임(-)", "화염정권	피해량(+)", "화염정권	체력소모도(-)", "화염돌파	피해량(+)"],
    ["요괴기원	회복율(+)", "무공집중	회복량(+)", "무공집중	쿨타임(-)", "도깨비탈출	피해량(+)", "도깨비탈출	쿨타임(-)", "도깨비탈출	지속시간(+)", "요괴현신	피해량(+)", "요괴현신	쿨타임(-)", "빙의:대장군	방어(+)"],
    ["불사표효	방어 감소(+)", "불사표효	쿨타임(-)", "도깨비속박	지속시간(+)", "도깨비속박	쿨타임(-)", "흡마귀술	지속시간(+)", "흡마귀술	쿨타임(-)", "나와라마혼승	이속감소율(+)", "나와라마혼승	쿨타임(-)", "나와라고목승	은신제한시간(+)", "나와라고목승	쿨타임(-)", "얼요빙결	쿨타임(-)", "빙의:괴선	수면저항(+)", "빙의:괴선	절망저항(+)", "빙의:괴선	침묵저항(+)"],
    
    // 차사 - 목, 투구, 무기, 갑옷, 망토
    ["차사강림	쿨타임(-)", "차사강림	피해증가율(+)", "차사강림	이속증가율(+)", "살극	피해량(+)", "살극	쿨타임(-)", "영기방패	방어(+)", "영기방패	피해흡수(+)", "영기개방	피해량(+)", "영검	영기소모도(-)", "영검	추가피해량(+)"],
    ["나선회륜	피해량(+)", "나선회륜	체마소모도", "풍화일섬	피해량(+)", "잔영	피해량(+)", "수라검	피해량(+)", "영기발출	피해량(+)", "영기발출	쿨타임(-)"],
    ["순섬	피해량(+)", "순섬	체력소모도(-)", "진섬	피해량(+)", "진섬	체력소모도(-)", "영살	피해량(+)", "영살	영기소모도(-)", "초열업화	피해량(+)", "초열업화	영기소모도(-)", "분쇄섬	피해량(+)", "분쇄섬	지속시간(+)"],
    ["역공	지속시간(+)", "역공	반격 피해량 증가(+)", "영기부활	쿨타임(-)", "영기부활	회복율(+)", "영혼걸음	쿨타임(-)", "영혼걸음	영기소모도(-)", "멸살	피해량(+)", "멸살	쿨타임(-)"],
    ["개안	쿨타임(-)", "저승문	쿨타임(-)", "저승문	방어(+)", "나락	피해량(+)", "영혼의고리	추가피해량(+)", "영혼의고리	흡혈랑(+)"],
  ];

  const skillList = skills[name].map((name: string, idx: number) => {
    return (
      <Menus value={idx + 1} key={idx + 1} disableGutters={true}>
        {name}
      </Menus>
    );
  });

  const switchDlg = () => {
    setOpenHelper(!openHelper);
  };

  useEffect(() => {
    setName(5 * type + parts + 1);
  }, [type, parts]);

  useEffect(() => {
    var values = [
      [],
      // 전사 - 목, 투구, 무기, 갑옷, 망토
      [0, 30, 30, 100, 200, 50, 50, 50, 10, 300, 100, 5],
      [0, 300, 50, 300, 50, 300, 320, 300, 540, 300, 540, 300, 50, 300, 300, 300, 300, 50],
      [0, 300, 300, 100, 300, 100, 300, 50, 300, 540, 300, 100, 300, 100, 300, 100, 300, 100],
      [0, 150, 200000, 200000, 300, 50, 50, 100, 200, 100, 16, 100],
      [0, 30, 4, 100, 4, 50, 640, 50, 15, 40, 100, 100, 300, 100, 220, 50, 50],

      // 도적 - 목, 투구, 무기, 갑옷, 망토
      [0, 15, 50, 50, 500, 50, 500, 10, 100, 100, 100, 300, 100, 7],
      [0, 300, 50, 300, 50, 300, 320, 300, 540, 300, 50, 300, 280, 300, 15, 10, 300, 40],
      [0, 300, 300, 100, 300, 100, 300, 100, 300, 8, 300, 5, 300, 15, 7, 15, 10],
      [0, 150, 200000, 30, 100, 100, 150, 100, 16, 300, 300],
      [0, 300, 50, 30, 100, 50, 100, 30, 4, 30, 300, 10, 300, 100, 300, 100],

      // 주술사 - 목, 투구, 무기, 갑옷, 망토
      [0, 220, 150000, 300, 250, 150, 50, 150, 10, 10, 10, 30, 540, 30],
      [0, 300, 100, 300, 100, 30, 300, 100, 340, 300, 450, 300, 450, 300, 250, 300, 300, 100, 300],
      [0, 300, 300, 300, 15, 100, 300, 30, 100, 50, 300, 300, 30, 300, 300, 100, 300],
      [0, 50, 16, 10, 100, 150, 50, 50, 50, 50000, 160, 50, 50, 100, 15],
      [0, 10, 7, 10, 100, 150, 10, 30, 30, 4],

      // 도사 - 목, 투구, 무기, 갑옷, 망토
      [0, 10, 10, 100, 100, 150, 10, 50, 50, 36, 36, 36, 36, 5, 60, 15, 6, 60, 60],
      [0, 300, 100, 5, 300, 50, 300, 50, 300, 300, 320, 100, 100],
      [0, 300, 300, 100, 300, 300, 300, 300, 300, 5, 160, 30, 100, 100, 10],
      [0, 100, 150, 50, 15, 150, 200000, 5, 300, 100, 15, 50, 50],
      [0, 10, 10, 50, 100, 150, 10, 100, 30, 4, 50, 50, 100, 30, 30],

      // 궁사 - 목, 투구, 무기, 갑옷, 망토
      [0, 15, 30, 100, 15, 200, 10, 300],
      [0, 50, 300, 30, 300, 320, 300, 100, 300, 100, 300, 470, 300, 30],
      [0, 300, 300, 10, 300, 100, 300, 100, 300, 30, 10, 50],
      [0, 15, 30, 100, 100, 50, 16, 5, 320, 300, 12],
      [0, 30, 30, 15, 30, 50, 30, 100, 80, 40, 15, 30, 4, 300, 30],

      // 천인 - 목, 투구, 무기, 갑옷, 망토
      [0, 50, 10, 7, 50, 50, 12, 100, 50, 50, 150, 50, 7, 30, 75, 7, 75, 75, 75, 50, 100, 100],
      [0, 300, 440, 300, 100, 300, 30, 300, 300, 30, 300, 15, 300, 30, 300, 15, 300, 50, 300, 100],
      [0, 300, 300, 100, 300, 300, 300, 300, 300, 30, 300, 50, 300, 100, 300, 30, 300, 300, 300, 300, 300],
      [0, 10, 100, 15, 20, 10, 20, 300, 100, 300, 300, 50, 10, 7, 50, 50, 300, 300, 300, 15, 100, 15, 100, 100, 10, 100, 75, 75, 250, 75, 75],
      [0, 540, 7, 300, 10, 100, 7, 100, 100, 7, 300, 7, 7, 100, 7, 10, 7, 15, 4, 20, 10, 100],

      // 마도사 - 목, 투구, 무기, 갑옷, 망토
      [0, 15, 50, 60, 12, 100, 100, 380],
      [0, 300, 100, 15, 300, 160, 100, 100, 100, 10, 440, 10, 100, 300, 50, 100, 300, 100],
      [0, 300, 300, 100, 15, 300, 20, 10, 20, 10, 20, 10, 160, 10, 12],
      [0, 20, 7, 20, 15, 100, 50, 50, 320, 50, 150, 10, 5, 15, 15],
      [0, 5, 15, 15, 50, 20, 50, 540, 160, 100, 100, 30, 300, 300, 50],

      // 영술사 - 목, 투구, 무기, 갑옷, 망토
      [0, 30, 150, 100, 100, 300, 30, 300, 30, 300, 60, 20, 20, 10, 50],
      [0, 300, 100, 100, 300, 300, 100, 100, 30, 100, 100, 100],
      [0, 300, 300, 100, 300, 300, 30, 300, 100, 300],
      [0, 10, 300, 50, 300, 100, 30, 300, 30, 10],
      [0, 10, 30, 30, 150, 50, 50, 10, 30, 4, 30, 30, 1000, 1000, 1000, 1000],

      // 차사 - 목, 투구, 무기, 갑옷, 망토
      [0, 50, 300, 10, 300, 100, 10, 100, 300, 100, 30],
      [0, 300, 100, 300, 300, 300, 300, 50],
      [0, 300, 100, 300, 100, 300, 100, 300, 100, 300, 100],
      [0, 20, 10, 320, 10, 220, 100, 300, 100],
      [0, 50, 50, 10, 300, 30, 100],
    ];

    let temp: number = Number((200 / values[name][sNumber]).toFixed(3));
    if (Math.floor(sInput * temp) <= 200) {
      setSkillPower(Math.floor(sInput * temp));
    } else {
      setSInput(0);
      setSkillPower(0);
    }
  }, [sInput, sNumber, name]);

  return (
    <React.Fragment>
      <Grid item style={{ padding: "0", float: "left" }}>
        <Select
          className={classes.select}
          variant='outlined'
          defaultValue={0}
          onChange={e => {
            setType(Number(e.target.value));
          }}
          style={{
            width: "120px",
          }}>
          <Menus value={0}>전사</Menus>
          <Menus value={1}>도적</Menus>
          <Menus value={2}>주술사</Menus>
          <Menus value={3}>도사</Menus>
          <Menus value={4}>궁사</Menus>
          <Menus value={5}>천인</Menus>
          <Menus value={6}>마도사</Menus>
          <Menus value={7}>영술사</Menus>
          <Menus value={8}>차사</Menus>
        </Select>
        <Select
          className={classes.select}
          variant='outlined'
          defaultValue={0}
          onChange={e => {
            setParts(Number(e.target.value));
          }}
          style={{
            width: "160px",
          }}>
          <Menus value={0} disableGutters={true}>
            목/어깨장식
          </Menus>
          <Menus value={1}>투구</Menus>
          <Menus value={2}>무기</Menus>
          <Menus value={3}>갑옷</Menus>
          <Menus value={4}>망토</Menus>
        </Select>
      </Grid>
      <Grid item style={{ padding: "0", float: "left" }}>
        <Select
          variant='outlined'
          className={classes.select}
          defaultValue={0}
          onChange={e => {
            setSNumber(Number(e.target.value));
            setSInput(0);
          }}>
          <Menus value={0}>기술 능력</Menus>
          {skillList}
        </Select>
        <TextField
          variant='outlined'
          type='number'
          className={classes.selText}
          disabled={sNumber === 0}
          placeholder='수치'
          value={sInput || ""}
          onChange={e => {
            setSInput(Number(e.target.value));
          }}
        />
      </Grid>
      <Grid item style={{ width: "100%", padding: "0", float: "left" }}>
        <Typography className={classes.powerText}>기술능력 전투력 : {skillPower}</Typography>
        <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px" }} onClick={switchDlg}>
          ?
        </Button>
      </Grid>

      <Dialog open={openHelper} onClose={switchDlg} maxWidth='lg'>
        <DialogTitle style={{ padding: "10px", textAlign: "center" }}>
          <Typography style={{ fontFamily: "Do Hyeon", fontSize: "2.5rem", color: "blue" }}>기술능력 전투력 TMI</Typography>
        </DialogTitle>
        <DialogContent dividers={true} style={{ padding: "20px 30px" }}>
          <Typography variant='h5' className={classes.dlgText} style={{ color: "red" }}>
            ★ 기술능력 전투력 = 장비에 부여된 기술능력들의 전투력 ★
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 장비당 2~3가지 종류의 기술능력이 중복 없이 부여된다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 기술능력 전투력의 최대값은 대략 200이다. (오차 존재)
          </Typography>
          <Typography variant='h5' className={classes.dlgText} style={{ margin: "0" }}>
            * 패치를 통해 일부 기술능력이 삭제되거나 수치가 조정되었다.
          </Typography>
          <Typography variant='h6' className={classes.dlgText} style={{ height: "28px", paddingLeft: "20px" }}>
            So, 그전에 부여된 아이템은 여전히 이탈 옵션을 유지하고 있다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 치장 한벌효과인 모든 능력 증가가 반영된다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={switchDlg} style={{ fontFamily: "Do Hyeon", fontSize: "1.2rem", padding: "0" }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
