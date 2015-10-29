(function() {
    var Machine = function(word) {
        var upperWord = word.toUpperCase();

        return {
            getWordLength: function() {
                return upperWord.length;
            },

            attack: function(targetChar) {
                var result = [];
                while ((index = upperWord.indexOf(targetChar)) !== -1) {
                    result.push(index);
                    upperWord = upperWord.replace(targetChar, '*');
                }

                return result;
            },

            isFinish: function() {
                return upperWord.length === (upperWord.split('*').length - 1);
            },
        }
    };

    var GameClient = function() {
        var als = [];

        var my = null;
        var enemy = null;

        return {
            start: function() {
                als = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ]

                var myWord = 'egg';
                my = new Machine(myWord);

                var enemyWord = 'kakao';
                enemy = new Machine(enemyWord);

                this.clearEnemyWordBox();
                this.clearMyWordBox();

                $('#enemyAttackChar').text('');
            },

            nextTurn: function() {
                if (enemy.isFinish()) {
                    alert('勝った！');

                    this.start();
                    return;
                }

                var randomIndex = Math.floor(Math.random() * (als.length + 1));
                var targetChar = als[randomIndex];
                this.hit(targetChar);

                if (my.isFinish()) {
                    alert('負けた...');

                    this.start();
                    return;
                }
            },

            clearEnemyWordBox: function() {
                $('#showEnemyWordSpace').empty();

                for (var i = 0; i < enemy.getWordLength(); i++) {
                    $('#showEnemyWordSpace').append($('<td class="charBox"></td>'));
                }
            },

            clearMyWordBox: function() {
                $('#showMyWordSpace').empty();

                for (var i = 0; i < my.getWordLength(); i++) {
                    $('#showMyWordSpace').append($('<td class="charBox"></td>'));
                }

                var self = this;
                $('#attackCharSpace').find('.charBox').each(function() {
                    $(this).on('click', function() {
                        var targetChar = $(this).text();
                        self.attack(targetChar);
                    });
                });
            },

            attack: function(targetChar) {
                var hitIndexList = enemy.attack(targetChar);

                if (hitIndexList.length !== 0) {
                    $('#showEnemyWordSpace').find('.charBox').each(function(index) {
                        if (hitIndexList.indexOf(index) === -1) return;
                        $(this).text(targetChar);
                    });
                }

                this.nextTurn();
            },

            hit: function(targetChar) {
                var index = als.indexOf(targetChar);
                als.splice(index, 1);

                $('#enemyAttackChar').text(targetChar);

                var hitIndexList = my.attack(targetChar);
                if (hitIndexList.length === 0) return;
                $('#showMyWordSpace').find('.charBox').each(function(index) {
                    if (hitIndexList.indexOf(index) === -1) return;
                    $(this).text(targetChar);
                });
            }
        }
    }

    var gameClient = new GameClient();
    gameClient.start();
})();
