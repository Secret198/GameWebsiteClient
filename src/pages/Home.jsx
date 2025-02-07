import personImg from "../assets/person.jpg"
import gameShowCaseMenu from "../assets/gameShowCaseMenu.jpg"
import gameShowCaseGameplay from "../assets/gameShowCaseGameplay.jpg"
import gameShowCaseBoss from "../assets/gameShowCaseBoss.jpg"

export default function Home() {

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
                <p className="justifyText">A csapatunk egy fiatal és dinamikus fejlesztőcsapat, akik szenvedéllyel dolgoznak azon, hogy egyedi és izgalmas játékélményeket hozzanak létre. Munkánk során fontos számunkra, hogy a legújabb technológiákat alkalmazzuk, és folyamatosan figyeljük a játékosok visszajelzéseit, hogy mindig a legjobb élményt nyújthassuk. Fejlesztőink különböző területeken szakosodtak, mint a grafika, a programozás és a játéktervezés, így minden részletre nagy figyelmet fordítunk, hogy egy teljes élményt nyújtsunk.</p>
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
                        <figcaption>Ákos</figcaption>
                    </figure>

                </div>
                <div className="waves">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgb(18, 18, 66)"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}