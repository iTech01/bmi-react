import { useState, useEffect} from 'react';
import styles from './App.module.css';
import poweredImage from './assets/tech.jpeg';
import leftArrowImage from './assets/leftarrow.png'
import { levels, calculateImc } from './helpers/imc';
import { GridItem } from './components/GridItem/GridItem';
import { Level } from './helpers/imc';

const App = () =>{

  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);
  const [voidField, setVoidField] = useState<boolean>(false);

  const handleCalculateButton = () =>{
    
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField));
      
    }else{
      setVoidField(true);
    }
  }
  const handleBackButton = () =>{
    
    setToShow(null); 
    setHeightField(0);
    setWeightField(0);
  }
  const verifyVoid = () =>{
    
    if(heightField && weightField < 0){
      setVoidField(true);
    }
    else{
      setVoidField(false);
    }
  }
  useEffect(()=>{
    verifyVoid();
  },[heightField, weightField]);

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="avatar-iTech01" width={150}/>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
          <div className={styles.menssage}>{voidField && <p >Digite todos os campos...</p>}</div>
          
          <input 
          type="number"
          placeholder="Digite a sua altura. Ex 1.5 (em metros)"
          value={heightField > 0 ? heightField: ""}
          onChange={e => setHeightField(parseFloat(e.target.value))}
          disabled={toShow?true:false}
          />
          <input 
          type="number"
          placeholder="Digite a seu peso. Ex 75.3 (em kg)"
          value={weightField > 0 ? weightField : ""}
          onChange={e => setWeightField(parseFloat(e.target.value))}
          disabled={toShow?true:false}
          />
          <button onClick={handleCalculateButton} disabled={toShow?true:false}>Calcular</button>
          
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
          <div className={styles.grid}>
            {levels.map((item,key)=>(
              <GridItem key={key} item={item}/>
            ))}
          </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt='' width={25}/>
              </div>
              <GridItem item={toShow}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
export default App;