import { Text, View, StyleSheet } from 'react-native'

interface ToParBreakdownProps {
    toPar3: number,
    toPar4: number,
    toPar5: number,
    
}

const ToParBreakdown2: React.FC<ToParBreakdownProps> = ({ toPar3, toPar4, toPar5, }) => {
    return (
        <>

        

        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            
            
            <View style={[styles.circle, {marginBottom:40}]}>
                <Text style={{ fontSize: 40, color: 'whitesmoke' }}>{toPar3}</Text>
                <Text style={{ fontSize: 10, color: 'whitesmoke' }}>Par 3's</Text>
            </View>



            <View style={[styles.circle, {marginTop:0}]}>
                <Text style={{ fontSize: 40, color: 'whitesmoke' }}>{toPar4}</Text>
                <Text style={{ fontSize: 10, color: 'whitesmoke' }}>Par 4's</Text>
            </View>



            <View style={[styles.circle, {marginBottom:40}]}>
                <Text style={{ fontSize: 40, color: 'whitesmoke' }}>{toPar5}</Text>
                <Text style={{ fontSize: 10, color: 'whitesmoke' }}>Par 5's</Text>
            </View>


        </View>
        </>
    )
}

export default ToParBreakdown2;



const styles = StyleSheet.create({
    circle: {
        height: 100,
        width: 100,
        backgroundColor: '#444',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },

})