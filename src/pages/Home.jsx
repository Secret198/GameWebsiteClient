import personImg from "../assets/person.jpg"
import gameShowCaseMenu from "../assets/gameShowCaseMenu.jpg"
import gameShowCaseGameplay from "../assets/gameShowCaseGameplay.jpg"
import gameShowCaseBoss from "../assets/gameShowCaseBoss.jpg"

export default function Home(){

    return (
        <div className="container">
            <h1 className="centerText">R.O.L.A.N.D</h1>
            <div className="showCase">
                <p className="justifyText">Egy brutális játék, ahol túl kell élned az ellenségek hullámait egy könyörtelen és folyamatosan változó kazamatában. Ugorj bele egy portálba, ami egyre mélyebbre visz a démoni fészekbe. Harcolj végig a rengeteg ellenségen, hogy megkeresd a jutalmadat a szint végén! Nyiss ki ládákat, hogy fegyvereket szerezz, amelyek még szórakoztatóbbá és könnyebbé teszik az ellenségek legyőzését! Szerelj fel rúnákat, hogy a karaktered különleges képességekkel rendelkezzen, és még erősebb legyen, mint valaha! Szerezz pénzt az utánad maradt holttestekből, vagy győzd le a gonosz főnököket, hogy még több gazdagságra tegyél szert! Látogass meg egy boltot, hogy elköltsd a kemény munkával szerzett érmeidet! És ha már nem bírod tovább, és a karaktered meghal, kezdheted újra az egészet a legelejétől! Semmit sem fejleszthetsz vagy tarthatsz meg! Milyen szórakoztató!</p>
                <div className="imgContainer">
                    <img src={gameShowCaseMenu} alt="Főmenü" />
                    <img src={gameShowCaseGameplay} alt="Játékmenet" />
                    <img src={gameShowCaseBoss} alt="Boss fight" />
                </div>
            </div>
            <div className="team">
                <h2>Rólunk</h2>
                <p>A csapatunk egy fiatal és dinamikus fejlesztőcsapat, akik szenvedéllyel dolgoznak azon, hogy egyedi és izgalmas játékélményeket hozzanak létre. Munkánk során fontos számunkra, hogy a legújabb technológiákat alkalmazzuk, és folyamatosan figyeljük a játékosok visszajelzéseit, hogy mindig a legjobb élményt nyújthassuk. Fejlesztőink különböző területeken szakosodtak, mint a grafika, a programozás és a játéktervezés, így minden részletre nagy figyelmet fordítunk, hogy egy teljes élményt nyújtsunk.</p>
                <div className="imgContainer">
                    <figure>
                        <img src={personImg} alt="Roland" />
                        <figcaption>Roland</figcaption>
                    </figure>
                    <figure>
                        <img src={personImg} alt="Bendegúz" />
                        <figcaption>Bendegúz</figcaption>    
                    </figure>
                    <figure>
                        <img src={personImg} alt="Ákos" />
                        <figure>Ákos</figure>    
                    </figure>
                </div>
            </div>
        </div>
    )
}